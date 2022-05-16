<template>
  <header class="p-3">
    <div class="container-fluid">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
          <font-awesome-icon :icon="['fas', 'passport']" class="fa-2x" />
        </a>

        <form class="col-8 d-flex">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
          <span class="input-group-text" @click="search()">
            <font-awesome-icon :icon="['fas', 'search']" />
          </span>
        </form>

        <div class="text-end">
          <button type="button" :class="'btn btn-outline-warning me-2'" @click="logout()"> {{ 'Logout' }}</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'NavbarApp',
  props: {
    logged: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: {
    /* HelloWorld, */
  },
  setup(props, context) {
    const store = inject('store');

    // console.log(store, 'store');

    function logout() {
      localStorage.removeItem('user');
      window.location.reload();
    }

    return {
      store,
      logout
    };
  },
});
</script>

<style lang="scss">
/*  */
</style>