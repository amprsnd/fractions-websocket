<template>
  <div class="app">
    <header>
      <div class="container">
        <nav>
          <router-link to="/">Главная</router-link>
          <router-link to="/fractions">Дроби</router-link>
          <router-link to="/websocket">Websocket</router-link>
        </nav>
      </div>
    </header>
    <section>
      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </section>
    <footer>
      <div class="container">
        footer
      </div>
    </footer>
  </div>
</template>

<style>
  :root {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    font-size: 16px;
  }
  html, body, .app {
    display: block;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  header, section, footer, .container {
    width: 100%;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  section {
    flex-grow: 2;
  }
  header {
    background: #d8d8d8;
  }
  footer {
    color: #fff;
    background: #2b2b2b;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 200ms ease-in-out;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
