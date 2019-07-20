<template>
  <div>
    <h1>Дроби</h1>
    <div class="equation">
      <fraction
        v-for="(f, i) in fractions"
        :key="i"
        v-model="fractions[i]"
        :class="[operations[i] === undefined ? 'last': '']"
      >
        <operator
          v-if="operations[i] !== undefined"
          v-model="operations[i]"
        />
      </fraction>
      <div class="result">
        <div class="equal">=</div>
        <div class="integer">{{ result.int }}</div>
        <div class="result-fraction">
          <div class="num">{{ result.num }}</div>
          <div class="den">{{ result.den }}</div>
        </div>
      </div>
    </div>
    <button class="add" @click="addFraction">Добавить дробь</button>
    <button class="remove" @click="removeFraction" v-if="fractions.length > 2">Удалить дробь</button>
  </div>
</template>

<script>
import Fraction from '../components/Fraction'
import Operator from '../components/Operator'

export default {
  name: 'fractions',
  components: {
    Fraction,
    Operator
  },
  data () {
    return {
      fractions: [
        {
          num: '',
          den: ''
        },
        {
          num: '',
          den: ''
        }
      ],
      operations: [''],
      result: {
        int: 0,
        num: 0,
        den: 0
      }
    }
  },
  methods: {
    addFraction () {
      this.fractions.push({ num: '', den: '' })
      this.operations.push('')
    },
    removeFraction () {
      this.fractions.pop()
      this.operations.pop()
    }
  }

}
</script>

<style>
  .equation {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .equal {
    font-size: 1.5rem;
    font-weight: 700;
    padding-right: 0.5rem;
  }

  .result {
    width: 250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: .5rem;
  }

  .integer {
    flex-grow: 1;
    font-size: 2rem;
    text-align: center;
  }

  .result-fraction {
    flex-grow: 2;
    font-size: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
  }

  .num:after {
    content: '';
    display: block;
    border-bottom: 0.125rem solid #000;
    margin: 0.4rem 0;
  }

  
  button {
    border: none;
    border-radius: 0.4rem;
    padding: 0.5rem;
    margin: 1rem 0.5rem 1rem 0;

    cursor: pointer;
    background: #e1e1e1;
  }

  input:focus, select:focus, button:focus {
    outline: none;
    box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, .1);
  }

</style>
