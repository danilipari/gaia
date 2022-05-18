<template>
  <div id="rules" class="container-fluid d-flex rounded py-4 text-success">
    <div :class="ruleSelected === null ? 'col' : 'col-4'">
      <h4>Rules</h4>
      <div class="goup-list rounded p-1">
        <div
          :class="
            'goup-list-item border rounded p-2 mb-2 text-center ' +
            (ruleSelected !== null ? 'w-100' : 'w-25')
          "
          @click="addRule()"
        >
          Add Rule <font-awesome-icon :icon="['fas', 'square-plus']" class="fa-x" />
        </div>
        <div
          :class="
            'goup-list-item border rounded p-2 mb-2 ' +
            (ruleSelected === index ? 'active' : '')
          "
          v-for="(rule, index) in rules"
          :key="index"
          @click="ruleSelected = index"
        >
          {{ index }} {{ rule.name }} - {{ rule.timestamp }}
        </div>
      </div>
    </div>
    <div
      v-if="ruleSelected !== null"
      :class="ruleSelected !== null ? 'col' : 'col-4'"
      @dblclick="showJSONView()"
    >
      <div class="d-flex justify-content-between">
        <h4>Info of Rule {{ rules[ruleSelected] }}</h4>
        <h5>{{ rules[ruleSelected].timestamp }}</h5>
      </div>
      <!-- rules[ruleSelected].uid.split("-")[0] -->

      <div class="p-2">
        <div class="form-group">
          <label for="name">Name: </label>
          <input
            name="name"
            type="text"
            class="form-control"
            v-model="rules[ruleSelected].name"
          />
        </div>
        <div class="form-group">
          <label for="name">Description: </label>
          <input
            name="name"
            type="text"
            class="form-control"
            v-model="rules[ruleSelected].description"
          />
        </div>
      </div>
    </div>
    <div v-if="showJSON" class="col ps-2">
      <div class="card p-2">
        <div class="d-flex justify-content-between">
          <p class="my-auto me-2">Actions:</p>
          <div class="d-flex">
            <button class="btn btn-success me-2" @click="actionJson('in')">
              <font-awesome-icon :icon="['fas', 'plus']" class="fa-1x" />
              <!-- <i class="fa-solid fa-rectangle-history-circle-plus"></i> -->
            </button>
            <button class="btn btn-success me-2" @click="actionJson('out')">
              <font-awesome-icon :icon="['fas', 'minus']" class="fa-1x" />
            </button>
          </div>
          <div>
            <button class="btn btn-outline-success" @click="showJSONView()">Close</button>
          </div>
        </div>
      </div>
      <Codemirror
        v-model="code"
        :style="'font-size: ' + fs + 'rem'"
        :options="cmOptions"
        :theme="'dracula'"
        placeholder="Yor JSON here!"
        :height="725"
        @change="change"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { computed, defineComponent, inject, Ref, ref } from "vue";

import Codemirror from "codemirror-editor-vue3";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/dracula.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css.js";
import { Rule } from "@/assets/interfaces";

export default defineComponent({
  name: "RulesView",
  components: {
    Codemirror,
  },
  created() {
    !localStorage.getItem("user") && this.$router.push("/login");
    this.setRules();
  },
  setup(props, context) {
    const store: any = inject("store");

    let code: string = "{}";
    const test: string = JSON.stringify({
      title: "eee",
    });

    // const rulesList = computed(() => rules.value);

    let rules: Ref<Array<Rule>> = ref([]);

    let fs: Ref = ref(1.2);
    let darkTheme: Ref = ref(true);
    let showJSON: Ref = ref(false);
    let ruleSelected: Ref = ref(null);

    function showJSONView() {
      showJSON.value = !showJSON.value;
    }

    let cmOptions = {
      mode: "text/javascript", // Language mode
      theme: "dracula", // Theme
      lineNumbers: true, // Show line number
      smartIndent: true, // Smart indent
      indentUnit: 4, // The smart indent unit is 2 spaces in length
      foldGutter: true, // Code folding
      styleActiveLine: true, // Display the style of the selected row
    };

    function actionJson(type: string) {
      if (type === "in") {
        if (fs.value >= 10) {
          fs.value = fs.value = 10;
        } else {
          fs.value = fs.value + 1.2;
        }
      } else {
        if (fs.value <= 1.2) {
          fs.value = fs.value = 1;
        } else {
          fs.value = fs.value - 1.2;
        }
      }
    }

    function addRule() {
      rules.value = [
        ...rules.value,
        {
          name: "Rule " + (rules.value.length + 1),
          uid: uuidv4(),
          timestamp: _.now(),
          attributes: [],
          decisions: [],
          permission: [],
        },
      ];

      const xx: string = JSON.stringify(rules.value);
      localStorage.setItem("rules", xx);
    }

    function setRules() {
      const rulesTemp = [
        {
          name: "Rule 1",
          uid: uuidv4(),
          description: "",
          timestamp: _.now(),
          attributes: [],
          decisions: [],
          permission: [],
        },
        {
          name: "Rule 2",
          uid: uuidv4(),
          description: "",
          timestamp: _.now(),
          attributes: [],
          decisions: [],
          permission: [],
        },
      ];
      rules.value = rulesTemp;
    }

    return {
      store,
      code,
      test,
      fs,
      darkTheme,
      cmOptions,
      showJSON,
      rules,
      ruleSelected,
      /* rulesList, */
      showJSONView,
      actionJson,
      addRule,
      setRules,
    };
  },
});
</script>
