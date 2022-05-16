<template>
  <div class="alert alert-warning" role="alert">DashboardView - {{ list }}</div>

  <!-- <pre>{{ engine }}</pre> -->
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { Engine } from "json-rules-engine";

export default defineComponent({
  name: "DashboardView",
  created() {
    if (!localStorage.getItem("user")) this.$router.push("/login");
  },
  setup(props, context) {
    const store: any = inject("store");

    let Rule = require("json-rules-engine").Rule;

    const engine: any = new Engine();

    const startR: object = {
      name: "test",
      conditions: {
        any: [],
        all: [],
      },
      event: {
        type: {},
      },
    };
    const startRR: object = {
      name: "test2",
      conditions: {
        any: [],
        all: [],
      },
      event: {
        type: {},
      },
    };

    const startDef: object = {
      name: "init",
      attributes: [],
      conditions: {
        any: [
          {
            fact: "rooms",
            operator: "equal",
            value: 3,
          },
        ],
      },
      event: {
        type: {},
      },
    };

    /* engine.addRule(startR);
    engine.addRule(startRR);

    engine.addFact("speed-of-light", 299792458); */

    engine.addRule(startDef);

    // engine.addFact("speed-of-light", 299792458);

    console.log(engine, "xxxx");
    /* cosnt engine = engine.addRule(microsoftRule) */

    return {
      store,
      engine,
    };
  },
});
</script>
