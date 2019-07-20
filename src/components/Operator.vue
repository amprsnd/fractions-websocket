<template>
  <div>
    <select @input="$emit('input', $event.target.value)">
      <option value=""></option>
      <option value="+">+</option>
      <option value="-">−</option>
      <option value="*">×</option>
      <option value="/">/</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'operator'
}
</script>

<style>
  select {
    width: 2.2rem;
    height: 2.2rem;
    box-sizing: border-box;
    padding-left: 0.6rem;
    border-radius: 50%;
    border: 1px solid #ccc;

    font-weight: 700;

    appearance: none;
    background: #f9f9f9;
  }
</style>
