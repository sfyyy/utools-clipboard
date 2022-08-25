<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { getUser } from "uTools";
console.log(getUser());
</script>

<template>
  <div class="app">
    <RouterLink class="tab" to="/">Home</RouterLink>
  </div>
  <RouterView />
</template>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
  display: flex;
  .tab {
    font-size: 24px;
    color: #d00;
  }
}
</style>
