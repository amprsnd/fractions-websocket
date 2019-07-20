<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/fractions">Дроби</router-link>
      <router-link to="/websocket">Websocket</router-link>
    </nav>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<style>
</style>
