<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import dayjs from "dayjs";
import { v4 } from "uuid";
new window.preload.Clipboard({
  textCallback: async (text: string) => {
    console.log(text, "当前剪切板内容");
    await window.preload.storage.set({
      id: v4(),
      content: text,
      type: "text",
      createTime: dayjs(new Date()).valueOf(),
    });
    console.log(await window.preload.storage.get());
  },
});
const get = async () => {
  const result = await window.preload.storage.get();
  console.log(result);
};
get();
// new window.preload.Clipboard({
//   textCallback: async (text: string) => {
//     console.log(text);
//     return text;
//   },
// });
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
