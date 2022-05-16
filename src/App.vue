<template>
  <!-- <HelloWorld :msg="'Welcome to ' + store.state.title + ' App'"/> -->
    <!-- {{ list }} -->
  <nav class="bg-light" v-if="logged">
    <navbar-app :logged="logged"></navbar-app>
  </nav>
  <div class="d-flex">
    <aside v-if="logged">
      <sidebar-app></sidebar-app>
    </aside>
    <main class="container-fluid">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import SidebarApp from '@/components/shared/SidebarApp.vue'
import NavbarApp from '@/components/shared/NavbarApp.vue'
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    SidebarApp,
    NavbarApp
  },
  setup(props, context) {
    const store = inject('store');

    const profilePic: string = 'https://avatars.githubusercontent.com/u/64545085';

    const random = [Math.floor(Math.random()* 12)];
    const list: Array<object> = Array(random[0]).fill('').map((el: string, index: number) => ({"name": 'Element-' + index, "index": index}));

    const logged: boolean = localStorage.getItem('user') ? true : false;

    console.log(localStorage.getItem('user'), 'user')

    // console.log(store, 'store');

    return {
      store,
      list,
      logged,
      profilePic
    };
  },
});
</script>

<style lang="scss">
@import "./assets/scss/__layout.scss";
</style>