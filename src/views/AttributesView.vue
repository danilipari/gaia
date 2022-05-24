<template>
  <div id="attributes" class="container-fluid d-flex rounded py-4">
    <div class="col">
      <h4 class="">Attributes</h4>
      <!-- <pre>{{ attributes }}</pre> -->
      <div class="group-list rounded p-1">
        <div class="d-flex justify-content-between px-2">
          <div
            :class="
              'group-list-item border rounded p-2 shadow-sm mb-2 text-center title ' +
              (attributeSelected !== null ? 'w-100' : 'w-25')
            "
            @click="goback()"
          >
            <span>&nbsp;</span> Go back <span class="ms-2">&nbsp;</span>
            <font-awesome-icon :icon="['fa', 'arrow-left']" class="fa-x" />
          </div>
          <div
            :class="
              'mx-2 group-list-item border rounded p-2 shadow-sm mb-2 text-center title ' +
              (attributeSelected !== null ? 'w-100' : 'w-25')
            "
            @click="addAttribute()"
          >
            <span>&nbsp;</span> Add attribute <span class="ms-2">&nbsp;</span>
            <font-awesome-icon :icon="['fas', 'square-plus']" class="fa-x" />
          </div>
          <div
            :class="
              'group-list-item border rounded p-2 shadow-sm mb-2 text-center title ' +
              (attributeSelected !== null ? 'w-100' : 'w-25')
            "
            @click="saveAttribute()"
          >
            <span>&nbsp;</span> Save all <span class="ms-2">&nbsp;</span>
            <font-awesome-icon :icon="['fas', 'save']" class="fa-x" />
          </div>
        </div>
        <div
          :class="
            'mx-2 group-list-item border rounded p-2 mb-2 ' +
            (attributeSelected === index ? 'active shadow' : '')
          "
          v-for="(attribute, index) in attributes"
          :key="index"
        >
          <!-- <pre>{{ attribute }}</pre> -->
          <div>
            <div class="d-flex justify-content-between" @click="setIndexAttribute(index)">
              <div class="d-flex justify-content-between">
                <p class="py-1 px-2 my-auto">{{ attribute.name }} - {{ index }}</p>
                <p class="border border-success rounded py-1 px-2 my-auto">
                  {{ attribute.type }}
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <span>&nbsp;</span>
                <font-awesome-icon
                  :icon="[
                    'fas',
                    accrodionIndex !== index ? 'chevron-up' : 'chevron-down',
                  ]"
                  class="fa-x fs-5 my-auto"
                />
                <span>&nbsp;</span>
                <span>&nbsp;</span>
              </div>
            </div>
            <div
              v-if="accrodionIndex === index"
              class="bg-white rounded"
              style="height: 160px"
            >
              <div class="d-flex justify-content-center pt-3">
                <!-- <label for="name" class="text-success">Insert attribute name:</label> -->
                <input
                  type="text"
                  id="name"
                  class="form-control w-25"
                  v-model="attribute.name"
                />
                <span class="mx-4">&nbsp;</span>
                <!-- <label for="type" class="text-success">Select attribute type:</label> -->
                <select
                  class="form-control w-25"
                  name="types"
                  id="types"
                  v-model="attribute.type"
                >
                  <option v-for="(type, iT) in types" :key="iT" :value="type">
                    {{ type }}
                  </option>
                </select>
              </div>
              <div class="d-flex justify-content-end mt-5">
                <button class="btn btn-outline-success">Remove</button>
                <span class="mx-2">&nbsp;</span>
                <button class="btn btn-success me-5">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/*  */
</style>
<script lang="ts">
import { Attribute, Rule, Types } from "@/assets/interfaces";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { computed, defineComponent, inject, Ref, ref, ComputedRef } from "vue";
import { useToast } from "vue-toastification";
import { structuredClone, goBack } from "@/components/shared/utils";

export default defineComponent({
  name: "AttributesView",
  created() {
    localStorage.getItem("user") && this.$router.push("/attributes");
  },
  setup(props, context) {
    const store: any = inject("store");

    const toast = useToast();
    const xxx: any = localStorage.getItem("rules");
    const accrodionIndex: Ref<number | null> = ref(null);
    const attributesC: ComputedRef<any> = computed(
      () => JSON.parse(xxx)[store.state.rule.ruleSelected].attributes
    );
    let attributes: Ref<Array<Attribute>> = ref([]);

    const attributeSelected: ComputedRef<any> = computed(
      () => store.state.rule.attributeSelected
    );
    const ruleSelected: ComputedRef<any> = computed(() => store.state.rule.ruleSelected);

    const types: any = Types;

    function addAttribute() {
      attributes.value = [
        ...attributes.value,
        {
          name: "Attribute",
          type: Types.string,
          uid: uuidv4(),
        },
      ];
      /* const rule: any = JSON.parse(xxx)[store.state.rule.ruleSelected];
      alert(JSON.stringify(rule)); */
      /* attributes.value = [
        ...rules.value,
        {
          name: "Rule " + (rules.value.length + 1),
          uid: uuidv4(),
          timestamp: _.now(),
          attributes: [],
          decisions: [],
          permissions: [],
        },
      ]; */
      /* const xx: string = JSON.stringify(rules.value);
      localStorage.setItem("rules", xx); */

      setIndexAttribute(attributes.value.length - 1);
      toast.success("Attribute added successfully!", { timeout: 1500 });
    }

    function saveAttribute() {
      const xxx: any = localStorage.getItem("rules");
      const rules: Ref<Array<Rule>> = ref(JSON.parse(xxx));

      console.log(
        rules.value,
        "r: " + ruleSelected.value,
        "a: " + attributeSelected.value
      );

      const final = structuredClone([
        ...rules.value,
        { ...rules.value[ruleSelected.value], attributes: attributes.value },
      ]);
      console.log(final);

      localStorage.setItem("rules", JSON.stringify(final));

      // localStorage.setItem("rules", {});
      toast.success("List of attributes saved successfully!");
    }

    function setIndexAttribute(index: number) {
      store.state.rule.attributeSelected = index;

      accrodionIndex.value === index
        ? (accrodionIndex.value = null)
        : (accrodionIndex.value = index);
    }

    function goback() {
      goBack();
    }

    return {
      attributes,
      attributesC,
      ruleSelected,
      attributeSelected,
      accrodionIndex,
      types,
      addAttribute,
      setIndexAttribute,
      saveAttribute,
      goback,
    };
  },
  methods: {
    route(path: string) {
      this.$router.push(path);
    },
  },
});
</script>
