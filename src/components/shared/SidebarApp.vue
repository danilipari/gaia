<template>
  <div id="sidebar">
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      :style="'width: ' + width + 'px'"
      v-if="!menu && visible"
    >
      #other
    </div>
    <div
      class="d-flex flex-column flex-shrink-0 p-3 bg-light"
      :style="'width: ' + width + 'px'"
      v-if="menu && visible"
    >
      <!-- <a href="/" class="text-decoration-none mx-auto">
        <span class="fs-3">GAIA</span>
      </a>
      <hr /> -->
      <router-link
        :to="item.path"
        v-for="(item, index) in list"
        :key="index"
        v-slot="{ href, isActive }"
        class="text-decoration-none shadow-sm mb-2"
        ><!-- route, isActive, isExactActive -->
        <div :class="'nav nav-pills flex-column mb-auto rounded'">
          <a
            :href="href"
            @click="navigate"
            :class="'nav-link link-dark ' + (isActive ? 'active-link' : '')"
          >
            {{ item.name }}
            <!-- {{ isActive }} -->
          </a>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "SidebarApp",
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: true,
    },
    menu: {
      type: Boolean,
      required: true,
      default: true,
    },
    width: {
      type: Number,
      required: true,
      default: 250,
    },
  },
  components: {
    /* HelloWorld, */
  },
  setup(props, context) {
    const store = inject("store");

    const profilePic: string = "https://avatars.githubusercontent.com/u/64545085";

    const random = [Math.floor(Math.random() * 15)];
    const arrRandom: Array<object> = [
      ...Array(random[0])
        .fill("")
        .map((el: string, index: number) => ({
          name: "Element-" + index,
          index: index,
          path: "/test-" + index,
        })),
    ];

    const list: Array<object> = [
      { name: "Dashboard", index: 0, path: "/dashboard" },
      { name: "Rules", index: 0, path: "/rules" },
    ];

    console.log(localStorage.getItem("user"), "user");

    function openLink(path: string) {
      console.log(path, "path");
    }

    // console.log(store, 'store');

    return {
      store,
      list,
      profilePic,
      openLink,
    };
  },
});
</script>

<style lang="scss" scoped>
#sidebar {
  height: 100%;
}
</style>
