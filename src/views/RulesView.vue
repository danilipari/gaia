<template>
  <div id="rules" class="container-fluid d-flex rounded py-4">
    <!-- {{ $store.state.rule.ruleSelected }} -->
    <div :class="ruleSelected === null ? 'col' : 'col-4'">
      <h4>Rules</h4>
      <div class="group-list rounded p-1">
        <div
          :class="
            'group-list-item border rounded p-2 shadow-sm mb-2 text-center title ' +
            (ruleSelected !== null ? 'w-100' : 'w-25')
          "
          @click="addRule()"
        >
          Add Rule <font-awesome-icon :icon="['fas', 'square-plus']" class="fa-x" />
        </div>
        <div
          :class="
            'group-list-item border rounded p-2 mb-2 ' +
            (ruleSelected === index ? 'active shadow' : '')
          "
          v-for="(rule, index) in rules"
          :key="index"
          @click="setIndexRule(index)"
        >
          {{ rule.name }} - {{ timestampToDate(rule.timestamp, true) }}
        </div>
      </div>
    </div>
    <div
      v-if="ruleSelected !== null"
      :class="ruleSelected !== null ? 'col' : 'col-4'"
      @dblclick="showJSONView()"
    >
      <div class="d-flex justify-content-between">
        <h4>Info of Rule</h4>
        <h5>{{ timestampToDate(rules[ruleSelected].timestamp, true) }}</h5>
      </div>
      <!-- rules[ruleSelected].uid.split("-")[0] -->

      <div class="pt-0 p-2">
        <div class="form-group">
          <label for="name">Name: </label>
          <input
            name="name"
            type="text"
            class="form-control"
            v-model="rules[ruleSelected].name"
          />
          <!--  -->
          <label for="name">Description: </label>
          <input
            name="name"
            type="text"
            class="form-control"
            v-model="rules[ruleSelected].description"
          />
          <!--  -->
          <div class="d-flex text-center mt-3 pt-4">
            <div class="col-4 p-1 py-2">
              <router-link to="/attributes">
                <div class="card d-flex shadow-sm">
                  <div class="fs-5 my-auto d-flex mx-auto">
                    <font-awesome-icon :icon="['fas', 'list']" class="icon my-auto" />
                    <span>&nbsp;</span>
                    <p class="mb-0 my-auto">Attributes:</p>
                    <span>&nbsp;</span>
                    <p class="mb-0 my-auto">
                      {{ rules[ruleSelected].attributes.length }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="col-4 p-1 py-2">
              <router-link to="/decisions">
                <div class="card d-flex shadow-sm">
                  <div class="fs-5 my-auto d-flex mx-auto">
                    <font-awesome-icon :icon="['fas', 'question']" class="icon my-auto" />
                    <span>&nbsp;</span>
                    <p class="mb-0 my-auto">Decisions:</p>
                    <span>&nbsp;</span>
                    <p class="mb-0 my-auto">{{ rules[ruleSelected].decisions.length }}</p>
                  </div>
                </div>
              </router-link>
            </div>

            <div class="col-4 p-1 py-2">
              <router-link to="/permissions">
                <div class="card d-flex shadow-sm">
                  <div class="fs-5 my-auto d-flex mx-auto">
                    <font-awesome-icon :icon="['fas', 'lock']" class="icon my-auto" />
                    <span>&nbsp;</span>
                    <p class="mb-0 my-auto">Permissions:</p>
                    <span>&nbsp;</span>
                    <p class="mb-0 my-auto">
                      {{ rules[ruleSelected].permissions.length }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showJSON" class="col ps-2">
      <div class="border rounded p-2">
        <div class="d-flex justify-content-between">
          <p class="my-auto me-2">Actions:</p>
          <div class="d-flex">
            <button class="btn btn-success me-2 shadow" @click="actionJson('in')">
              <font-awesome-icon :icon="['fas', 'plus']" class="fa-1x" />
              <!-- <i class="fa-solid fa-rectangle-history-circle-plus"></i> -->
            </button>
            <button class="btn btn-success me-2 shadow" @click="actionJson('out')">
              <font-awesome-icon :icon="['fas', 'minus']" class="fa-1x" />
            </button>
          </div>
          <div>
            <button class="btn btn-outline-success shadow" @click="showJSONView()">
              Close
            </button>
          </div>
        </div>
      </div>
      <Codemirror
        v-model="code"
        class="shadow"
        :style="'font-size: ' + fs + 'rem'"
        :options="cmOptions"
        :theme="'dracula'"
        @change="onChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { computed, defineComponent, inject, Ref, ref, ComputedRef } from "vue";
import { timestampToDate } from "../components/shared/utils";

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

    const code = ref(`
      var i = 0;
      for (; i < 9; i++) {
        console.log(i);
        // more statements
      }`);
    const test: string = JSON.stringify({
      title: "eee",
    });
    const ruleSelected: ComputedRef<any> = computed(() => store.state.rule.ruleSelected);

    let rules: Ref<Array<Rule>> = ref([]);

    let fs: Ref = ref(1.2);
    let darkTheme: Ref = ref(true);
    let showJSON: Ref = ref(false);
    // let ruleSelected: Ref = ref(null);
    let search: Ref = ref("");

    function showJSONView() {
      showJSON.value = !showJSON.value;
    }

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
          permissions: [],
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
          permissions: [],
        },
        {
          name: "Rule 2",
          uid: uuidv4(),
          description: "",
          timestamp: _.now(),
          attributes: [],
          decisions: [],
          permissions: [],
        },
      ];
      if (!localStorage.getItem("rules")) {
        rules.value = rulesTemp;
      } else {
        const xxx: any = localStorage.getItem("rules");
        rules.value = JSON.parse(xxx);
      }
    }

    /*  const mapActions = () => {
      const _store = store;
      return Object.fromEntries(
        Object.keys(_store._actions).map((action) => [
          action,
          (value: any) => store.dispatch(action, value),
        ])
      );
    }; */

    function setIndexRule(index: number) {
      store.state.rule.ruleSelected = index;
      // store.actions.rules.setRule("SET_RULE", index);
    }

    return {
      store,
      code,
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "dracula", // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      },
      test,
      fs,
      darkTheme,
      showJSON,
      rules,
      ruleSelected,
      search,
      /* rulesList, */
      showJSONView,
      actionJson,
      addRule,
      setRules,
      timestampToDate,
      setIndexRule,
      onChange(val: any, cm: any) {},
    };
  },
});
</script>
