<script setup lang="ts">
 import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="index-page-header">
    <nav class="index-page-header__nav">
      <RouterLink class="index-page-header__link" to="/section/1">Секция 1</RouterLink>
      <RouterLink class="index-page-header__link" to="/section/2">Секция 2</RouterLink>
      <RouterLink class="index-page-header__link" to="/section/3">Секция 3</RouterLink>
      <RouterLink class="index-page-header__link" to="/section/4">Секция 4</RouterLink>
      <RouterLink class="index-page-header__link" to="/section/5">Секция 5</RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
@import "index-module.scss";
</style>