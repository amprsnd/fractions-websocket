<template>
  <div>
    <h1>Websocket</h1>
    <div class="comments">
      <div
        v-for="(comment, i) in comments"
        :key="i"
        class="one-comment"
      >
        <div class="comment-num">{{ i + 1 }}.</div>
        <div class="comment-body">{{ comment }}</div>
        <div class="comment-delete">
          <button @click="deleteComment(i)">Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const socket = new WebSocket('ws://echo.websocket.org/')
const timeOut = 500

let tasks = []
let tasksCounter = 0

export default {
  name: 'websocket',
  data () {
    return {
      comments: [
        'Берегите в себе человека.',
        'Все дело в мгновении. Оно определяет жизнь.',
        'Плата за индивидуальность — одиночество.',
        'Громким смехом не скроешь дикой боли.',
        'Труднее всего терять несбывшееся.',
        'Все будет правильно, на этом построен мир.',
        'Хуже каменного сердца может быть только жидкий мозг.',
        'С первым осенним холодком жизнь начнется сначала.',
        'Одна из самых серьёзных потерь — потеря времени.',
        'Вечность влюблена в творения времени.',
        'Мы — рябь на времени.',
        'В полночь Вселенная пахнет звездами…',
        'С самого низа все пути ведут наверх.',
        'Per aspera ad astra',
        'Всё можно пережить, если подобрать нужную песню.',
        'Есть два убежища от жизненных невзгод: это музыка и кошки.'
      ]
    }
  },
  beforeMount () {
    this.comments.forEach((c, i) => {
      tasks.push(0)
    })
  },
  methods: {
    deleteComment (i) {
      if (tasks[i] !== 0) {
        console.log(`Комментарий №${i + 1} уже в очереди на удаление`)
        return
      }
      let timestamp = Date.now()

      tasksCounter++
      tasks[i] = tasksCounter

      socket.send(tasks[i])

      socket.onmessage = (e) => {
        let responseTime = Date.now() - timestamp
        let task = tasks.indexOf(parseInt(e.data))

        if (responseTime > timeOut) {
          tasks[task] = 0
          console.log(`Таймаут ответа сервера`)
          return
        }

        tasks.splice(task, 1)
        this.comments.splice(task, 1)
        console.log(`Комментарий №${task + 1} удалён`)
      }
    }
  }
}
</script>

<style scoped>
  .one-comment {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    box-sizing: border-box;
    padding: 0.5rem;
    margin-bottom: 0.25rem;

    border: 1px solid #777;
    line-height: 1.5rem;
  }
  .comment-num {
    flex-grow: 1;
    max-width: 35px;
    font-size: 0.75rem;
  }

  .comment-body {
    flex-grow: 3;
    font-size: 1.2rem;
  }

  .comment-delete button {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border: none;
    border-radius: 4px;
    background: #777;
    color: #fff;
    cursor: pointer;
  }
</style>
