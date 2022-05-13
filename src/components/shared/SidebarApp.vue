<template>
  <aside>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-2">GAIA</span>
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li>
          <a href="#" class="nav-link active" aria-current="page">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
            Dashboard
          </a>
        </li>
        <li v-for="(item, index) in list" :key="index">
          <a href="#" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
            {{ item.name }}
          </a>
        </li>
      </ul>
      <hr>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <img :src="profilePic" alt="" width="32" height="32" class="rounded-circle me-2">
          <strong>Dani</strong>
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
          <li><a class="dropdown-item" href="#">New project...</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'SidebarApp',
  components: {
    /* HelloWorld, */
  },
  setup(props, context) {
    const store = inject('store');

    const profilePic: string = 'https://avatars.githubusercontent.com/u/64545085';

    const random = [Math.floor(Math.random()* 15)];
    const list: Array<object> = Array(random[0]).fill('').map((el: string, index: number) => ({"name": 'Element-' + index, "index": index}));

    console.log(localStorage.getItem('user'), 'user')

    // console.log(store, 'store');

    return {
      store,
      list,
      profilePic
    };
  },
});
</script>

<style lang="scss">
  #sidebar {
    height: 100%;
  }
</style>