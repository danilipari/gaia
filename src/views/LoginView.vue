<template>
  <div id="login" class="container w-25 centered">
    <button class="w-100 btn btn-lg btn-primary py-3" @click="login()" type="button">
      Login with Azure
    </button>
    <hr />
    <div class="form-floating">
      <input
        type="email"
        class="form-control"
        id="email"
        placeholder="email"
        v-model="email"
        autocomplete="off"
      />
      <label for="email">Email</label>
    </div>
    <div class="input-group form-floating my-4">
      <input
        :type="!sP ? 'password' : 'text'"
        class="form-control"
        id="password"
        placeholder="Password"
        v-model="password"
        autocomplete="off"
      />
      <label for="password">Password</label>
      <span class="input-group-text" id="basic-addon1" @click="showP()">
        <font-awesome-icon :icon="['fas', sP ? 'eye' : 'eye-slash']" />
      </span>
    </div>

    <button class="w-100 btn btn-lg btn-outline-dark" type="button" @click="login()">
      Login
    </button>
  </div>
</template>
<style lang="scss" scoped>
/*  */
</style>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from "vue";

export default defineComponent({
  name: "LogInView",
  created() {
    localStorage.getItem("user") && this.$router.push("/dashboard");
  },
  setup(props, context) {
    const email: string = "admin" ?? null;
    const password: string = "admin" ?? null;
    const sP: Ref = ref(false);

    function showP() {
      sP.value = !sP.value;
    }

    function login() {
      localStorage.setItem("user", "admin");
      window.location.href = "/dashboard";
    }

    return {
      email,
      password,
      sP,
      showP,
      login,
    };
  },
});
</script>
