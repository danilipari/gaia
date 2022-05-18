<template>
  AttributesView
  <pre>
    {{ attributes }}
    {{ $store.state.rule.ruleSelected }}
  </pre>
</template>
<style lang="scss" scoped>
/*  */
</style>
<script lang="ts">
import { Attribute } from "@/assets/interfaces";
import { defineComponent, inject, Ref, ref } from "vue";

export default defineComponent({
  name: "AttributesView",
  created() {
    localStorage.getItem("user") && this.$router.push("/attributes");
  },
  setup(props, context) {
    let attributes: Ref<Array<Attribute>> = ref([]);

    return {
      attributes,
    };
  },
});
</script>
