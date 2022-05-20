<template>
  <div id="attributes" class="container-fluid d-flex rounded py-4">
    <pre>{{ attributesC }}</pre>
    <div class="col">
      <h4>
        Attributes - {{ $store.state.rule.ruleSelected }} - a:
        {{ $store.state.rule.attributeSelected }}
      </h4>
      <div class="group-list rounded p-1">
        <div class="d-flex justify-content-between px-2">
          <div
            :class="
              'group-list-item border rounded p-2 shadow-sm mb-2 text-center title ' +
              (attributeSelected !== null ? 'w-100' : 'w-25')
            "
          >
            <span>&nbsp;</span> Back <span class="ms-2">&nbsp;</span>
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
                  :icon="['fas', accrodionIndex !== index ? 'plus' : 'minus']"
                  class="fa-x fs-5 my-auto"
                />
                <span>&nbsp;</span>
                <span>&nbsp;</span>
              </div>
            </div>
            <div
              v-if="accrodionIndex === index"
              class="bg-white rounded"
              style="height: 100px"
            >
              <div class="d-flex">
                <input type="text" class="form-control w-25" v-model="attribute.name" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <pre>
    {{ attributes }}
    {{ $store.state.rule.ruleSelected }}
  </pre> -->
</template>
<style lang="scss" scoped>
/*  */
</style>
<script lang="ts">
import { Attribute, Types } from "@/assets/interfaces";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { computed, defineComponent, inject, Ref, ref, ComputedRef } from "vue";
import { useToast } from "vue-toastification";

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
      toast.success("Attribute added successfully!");
    }

    function saveAttribute() {
      toast.success("List of attributes saved successfully!");
    }

    function setIndexAttribute(index: number) {
      store.state.rule.attributeSelected = index;

      accrodionIndex.value === index
        ? (accrodionIndex.value = null)
        : (accrodionIndex.value = index);
    }

    return {
      attributes,
      attributesC,
      attributeSelected,
      accrodionIndex,
      types,
      addAttribute,
      setIndexAttribute,
      saveAttribute,
    };
  },
});
</script>
