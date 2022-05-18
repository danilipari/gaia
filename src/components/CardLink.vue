<template>
  <div :class="'p-4 text-center col-' + col">
    <router-link :to="link" class="text-decoration-none text-primary:hover">
      <div class="card">{{ title }}</div>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
/*  */
</style>
<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import { defineComponent, inject, Ref, ref } from "vue";

export default defineComponent({
  name: "CardLink",
  props: {
    title: {
      type: String,
      required: false,
      default: "title",
    },
    link: {
      type: String,
      required: false,
      default: "/",
    },
    col: {
      type: Number,
      required: false,
      default: 4,
    },
  },
  setup(props, context) {
    const store: any = inject("store");

    const uid: any = uuidv4();

    return {
      store,
      uid,
    };
  },
});
</script>
