<template>
  <header class="px-3 py-2">
    <div class="container-fluid">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
          <font-awesome-icon :icon="['fas', 'passport']" class="fa-2x" />
        </a>

        <form class="col-8 d-flex">
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
          <span class="input-group-text" @click="search()">
            <font-awesome-icon :icon="['fas', 'search']" />
          </span>
        </form>

        <div>
          <div class="dropdown">
            <a
              href="#"
              class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle p-2"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                :src="store.state.profilePic"
                alt=""
                width="32"
                height="32"
                class="rounded-circle me-2"
              />
              <strong>Dani</strong>
            </a>
            <ul
              class="dropdown-menu text-small shadow py-3"
              aria-labelledby="dropdownUser2"
            >
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" @click="logout()">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref } from "vue";

export default defineComponent({
  name: "NavbarApp",
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
    const store = inject("store");

    // console.log(store, 'store');

    function logout() {
      localStorage.removeItem("user");
      window.location.reload();
    }

    return {
      store,
      logout,
    };
  },
});
</script>

<style lang="scss">
/*  */
</style>
