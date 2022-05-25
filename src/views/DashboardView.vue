<template>
  <div class="alert alert-success mt-3 p-5" role="success">DashboardView</div>

  <div class="container-fluid">
    <div class="d-flex text-center">
      <card-link
        :title="'Rules: ' + (rules?.length ? rules.length : 0)"
        :link="'/rules'"
        :col="6"
      ></card-link>
      <div class="col-6 p-4">
        <!-- <download-csv class="btn btn-warning" :data="rules"> Export </download-csv> -->
        <div class="card">Generate / Export Engine - {{ 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from "vue";
import { Engine } from "json-rules-engine";
import CardLink from "@/components/CardLink.vue";

export default defineComponent({
  name: "DashboardView",
  components: {
    CardLink,
  },
  created() {
    !localStorage.getItem("user") && this.$router.push("/login");
  },
  setup(props, context) {
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

    const xx: any = localStorage.getItem("rules");

    const rules: Ref<any> = ref(JSON.parse(xx));

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

    // // console.log(engine, "xxxx");
    /* cosnt engine = engine.addRule(microsoftRule) */

    return {
      engine,
      rules,
    };
  },
});
</script>
