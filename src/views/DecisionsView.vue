<template>
  <div id="decisions" class="container-fluid d-flex rounded py-4">
    <div class="col">
      <h4 class="">Decisions</h4>
      <!-- <pre>{{ decisions }}</pre> -->
      <div class="group-list rounded p-1">
        <div class="d-flex justify-content-between px-2">
          <div
            :class="
              'group-list-item border rounded p-2 shadow-sm mb-2 text-center title-success ' +
              (decisionSelected !== null ? 'w-100' : 'w-25')
            "
            @click="goback()"
          >
            <span>&nbsp;</span> Go back <span class="ms-2">&nbsp;</span>
            <font-awesome-icon :icon="['fa', 'arrow-left']" class="fa-x" />
          </div>
          <div
            :class="
              'mx-2 group-list-item border rounded p-2 shadow-sm mb-2 text-center title-success ' +
              (decisionSelected !== null ? 'w-100' : 'w-25')
            "
            @click="addDecision()"
          >
            <span>&nbsp;</span> Add decision <span class="ms-2">&nbsp;</span>
            <font-awesome-icon :icon="['fas', 'square-plus']" class="fa-x" />
          </div>
          <div
            :class="
              'group-list-item border rounded p-2 shadow-sm mb-2 text-center title-success ' +
              (decisionSelected !== null ? 'w-100' : 'w-25')
            "
            @click="saveDecision(2)"
          >
            <span>&nbsp;</span> Save all <span class="ms-2">&nbsp;</span>
            <font-awesome-icon :icon="['fas', 'save']" class="fa-x" />
          </div>
        </div>

        <div
          :class="
            'mx-2 group-list-item border rounded p-2 mb-2 ' +
            (decisionSelected === index ? 'active shadow' : '')
          "
          v-for="(decision, index) in decisions"
          :key="index"
        >
          <div>
            <div class="d-flex justify-content-between" @click="setIndexDecision(index)">
              {{ JSON.stringify(decision) }}
            </div>
          </div>
        </div>

        <div>
          here
          <!--  -->
          !here
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.d3-tree-vii circle {
  fill: #fff;
  stroke: #54a8ff;
  stroke-width: 2px;
}

.d3-tree-vii .node text {
  font: 12px sans-serif;
}

.d3-tree-vii .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

.width-100-percent {
  width: 100%;
  height: calc(100vh - 74px);
}
</style>

<script lang="ts">
import { Decision, Operators, Rule } from "@/assets/interfaces";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { computed, defineComponent, inject, Ref, ref, ComputedRef, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { structuredClone, goBack } from "@/components/shared/utils";

export default defineComponent({
  name: "DecisionsView",
  created() {
    !localStorage.getItem("user") && this.$router.push("/login");
  },
  setup(_props, _context) {
    const store: any = inject("store");
    const toast = useToast();
    const rules: any = localStorage.getItem("rules");

    onMounted(() => {
      /*  */
    });

    /*  */

    const accrodionIndex: Ref<number | null> = ref(null);
    const decisionsComputed: ComputedRef<any> = computed(
      () => JSON.parse(rules)[store.state.rule.ruleSelected].decisions
    );
    let decisions: Ref<Array<Decision>> = ref(decisionsComputed.value);

    const decisionSelected: ComputedRef<any> = computed(
      () => store.state.rule.decisionSelected
    );
    const ruleSelected: ComputedRef<any> = computed(() => store.state.rule.ruleSelected);

    function goback() {
      goBack();
    }

    function addDecision() {
      decisions.value = [
        ...decisions.value,
        {
          all: [
            {
              fact: "fact",
              operator: Operators.equal,
              value: "",
              uid: uuidv4(),
              global: false,
            },
          ],
          any: [],
          event: {
            type: "",
            params: {},
          },
        },
      ];

      setIndexDecision(decisions.value.length - 1);
      toast.success("Decision added successfully!", { timeout: 1500 });
    }

    function setIndexDecision(index: number) {
      store.state.rule.decisionSelected = index;

      accrodionIndex.value === index
        ? (accrodionIndex.value = null)
        : (accrodionIndex.value = index);
    }

    function saveDecision(item: number) {
      const xxx: any = localStorage.getItem("rules");
      let rules: Ref<Array<Rule>> = ref(JSON.parse(xxx));

      rules.value[ruleSelected.value].decisions = decisions.value;

      const xx: Array<Rule> = structuredClone(rules.value);
      localStorage.setItem("rules", JSON.stringify(xx));

      item === 1
        ? toast.success("Decision saved successfully!")
        : item === 2
        ? toast.success("All decisions of Rule saved successfully!")
        : toast.info("Decisions of Rule updated successfully!");
    }

    return {
      decisions,
      ruleSelected,
      decisionSelected,
      accrodionIndex,
      rules,
      setIndexDecision,
      goback,
      addDecision,
      saveDecision,
    };
  },
});
</script>
