<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { db } from "uTools";
new window.preload.ClipboardConstructor({
  textCallback: async (text: string) => {
    console.log(text);
    return text;
  },
});
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
