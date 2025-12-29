<template>

</template>

<script setup>
  import {
    ref
  } from 'vue';
  let a = [{
    id: 3,
    name: 4
  }]
  let b = [{
    id: 3,
    name: 4
  }]
  let c = [...a, ...b].length
  console.log(c)
</script>

<style lang="scss" scoped>

</style>