<template>
  <div class="alert alert-warning" role="alert">
    DashboardView - {{ list }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'DashboardView',
  created() {
    if(!localStorage.getItem('user'))
    this.$router.push('/login');
  },
  setup(props, context) {
    const store: any = inject('store');

    return {
      store,
    };
  },
});
</script>