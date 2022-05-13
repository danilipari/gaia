<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <font-awesome-icon :icon="['fas', 'home']" class="fa-2x" />
        </a>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2">Login</button>
          <button type="button" class="btn btn-warning">Logout</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'NavbarApp',
  components: {
    /* HelloWorld, */
  },
  setup(props, context) {
    const store = inject('store');

    // console.log(store, 'store');

    return {
      store,
    };
  },
});
</script>

<style lang="scss">
/*  */
</style>