<template>
  <div class="fraction-group">
    <div class="fraction">
      <input
        type="number"
        class="num"
        min="0"
        step="1"
        v-model.number="fraction.num"
        oninput="validity.valid||(value='')"
        @input="$emit('input', fraction)"
      >
      <div class="divider"></div>
      <input
        type="number"
        min="1"
        step="1"
        v-model.number="fraction.den"
        oninput="validity.valid||(value='')"
        @input="$emit('input', fraction)"
      >
    </div>
    <div class="operator">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'fraction',
  data () {
    return {
      fraction: {
        num: null,
        den: null
      }
    }
  }
}
</script>

<style>
  .fraction-group {
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .fraction-group.last {
    width: 150px;
  }
  .fraction {
    width: 150px;
  }
  input[type="number"] {
    display: block;
    width: 90%;
    margin: 0;
    padding: 0.1rem 0;
    font-size: 1.5rem;
    line-height: 1.5rem;

    border: none;
    border-radius: 0.4rem;
    text-align: center;
    background: #f9f9f9;
  }
  .divider {
    width: 90%;
    border-bottom: 0.125rem solid #000;
    margin: 0.4rem 0;
  }
</style>
