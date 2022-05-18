<template>
  <nav class="bg-light" v-if="structure.navbar && logged">
    <navbar-app :logged="logged"></navbar-app>
  </nav>
  <div class="d-flex">
    <aside v-if="logged">
      <sidebar-app
        :visible="structure.sidebar_left"
        :menu="true"
        :width="220"
      ></sidebar-app>
    </aside>
    <main class="container-fluid" v-if="structure.main">
      <router-view></router-view>
    </main>
    <aside v-if="logged">
      <sidebar-app
        :visible="structure.sidebar_right"
        :menu="false"
        :width="500"
      ></sidebar-app>
    </aside>
  </div>
</template>

<script lang="ts">
import SidebarApp from "@/components/shared/SidebarApp.vue";
import NavbarApp from "@/components/shared/NavbarApp.vue";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "App",
  components: {
    SidebarApp,
    NavbarApp,
  },
  setup(props, context) {
    const store = inject("store");

    const profilePic: string = "https://avatars.githubusercontent.com/u/64545085";

    const random = [Math.floor(Math.random() * 12)];
    const list: Array<object> = Array(random[0])
      .fill("")
      .map((el: string, index: number) => ({ name: "Element-" + index, index: index }));

    const logged: boolean = localStorage.getItem("user") ? true : false;

    const structure: object = {
      navbar: true,
      sidebar_left: true,
      sidebar_right: false,
      main: true,
    };

    // console.log(store, 'store');

    return {
      store,
      list,
      logged,
      profilePic,
      structure,
    };
  },
});
</script>

<style lang="scss">
@import "./assets/scss/__layout.scss";
</style>
