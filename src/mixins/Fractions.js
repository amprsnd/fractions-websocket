export default {
  methods: {
    // Добавить/Удалить дроби
    addFraction () {
      this.fractions.push({ num: null, den: null })
      this.operations.push('')
    },
    removeFraction () {
      this.fractions.pop()
      this.operations.pop()
    },

    // Валидации
    validateFractions () {
      this.fractions.some((fraction) => {
        // Проверка на заполнение дробей
        if (typeof fraction.num !== 'number' || typeof fraction.den !== 'number') {
          this.message = 'Заполните значения дробей'
          return true
        }
        // Проверка на отрицательные числа
        if (fraction.num < 0 || fraction.den < 0) {
          this.message = 'Нельзя вводить отрицательные числа'
          return true
        }
        // Проверка на нулевой знаменатель
        if (fraction.den === 0) {
          this.message = 'Знаменатель не может быть равен нулю'
          return true
        }
        // TODO: проверка на дроби
        // Дроби заполнены нормально, переходим к знакам
        this.validateOperations()
      })
    },
    validateOperations () {
      // Заполнены не все знаки
      if (this.operations.includes('')) {
        this.message = 'Расставьте все знаки'
        return
      }
      // После знака деления в числителе ноль
      let division = this.operations.indexOf('/')
      if (division >= 0 && this.fractions[division + 1].num === 0) {
        this.message = 'На ноль делить нельзя'
        return
      }
      this.message = ''
    },

    // Математические действия с дробями
    '+': function (a, b) {
      let common = this.commonDenominator(a, b)
      return {
        num: common.a + common.b,
        den: common.c
      }
    },
    '-': function (a, b) {
      let common = this.commonDenominator(a, b)
      return {
        num: common.a - common.b,
        den: common.c
      }
    },
    '*': function (a, b) {
      return {
        num: a.num * b.num,
        den: a.den * b.den
      }
    },
    '/': function (a, b) {
      return {
        num: a.num * b.den,
        den: b.num * a.den
      }
    },

    /*
    * Приведение дробей к общему знаменателю
    * Возвращает объект с тремя значениями:
    * a - числитель первой дроби
    * b - числитель второй дроби
    * c - общий знаменатель
    */
    commonDenominator (a, b) {
      let commonDenominator = a.den * b.den
      return {
        a: a.num * b.den,
        b: b.num * a.den,
        c: commonDenominator
      }
    },

    /*
    * Рассчёт всего уравнения
    * f - fractions (массив дробей)
    * o - operations (массив действий)
    * Рекурсивная функция, вызывает саму себя пока
    * не будут выполнены все действия в массиве operations
    */
    calculate (f, o) {
      // Валидация не пройдена
      if (this.message) return

      let fractions = f.slice()
      let operations = o.slice()

      // Расчёт окончен
      if (operations.length === 0) {
        let result = {
          int: 0,
          num: fractions[0].num,
          den: fractions[0].den
        }

        // Сокращает дробь до неделимой
        result = this.reduceFraction(result)

        // Выносит целую часть если такая имеется
        result = this.getInteger(result)

        // Выводит результат
        this.result.int = result.int
        this.result.num = result.num
        this.result.den = result.den
        return
      }

      // Выполняет в первую очередь действия умножения и деления
      let multiplication = operations.indexOf('*')
      let division = operations.indexOf('/')

      if (multiplication >= 0 || division >= 0) {
        if (multiplication > division) {
          this.executeOperation('*', multiplication, fractions, operations)
        } else {
          this.executeOperation('/', division, fractions, operations)
        }
        this.calculate(fractions, operations)
        return
      }

      // Выполняет остальные действия по порядку после деления и умножения
      this.executeOperation(operations[0], 0, fractions, operations)
      this.calculate(fractions, operations)
    },

    // Выполнение математического действия
    // TODO: do refactor (упростить передачу параметров)
    executeOperation (action, index, fractions, operations) {
      let result = this[action](fractions[index], fractions[index + 1])
      fractions[index] = result
      fractions.splice(index + 1, 1)
      operations.splice(index, 1)
    },

    // Сокращение дроби
    reduceFraction (result) {
      let a = Math.abs(result.den)
      let b = Math.abs(result.num)
      let gdc = this.gcd(a, b)

      return {
        int: result.int,
        num: result.num / gdc,
        den: result.den / gdc
      }
    },

    // Наименьший общий делитель
    gcd (a, b) {
      return b ? this.gcd(b, a % b) : a
    },

    // Выделение целого числа
    getInteger (result) {
      if (result.num < result.den) return result

      return {
        int: parseInt(result.num / result.den),
        num: result.num % result.den,
        den: result.den
      }
    },
    validateAndCalculate () {
      this.validateFractions()
      this.calculate(this.fractions, this.operations)
    }
  }
}
