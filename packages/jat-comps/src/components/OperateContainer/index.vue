<template>
  <div class="flex w-full justify-end">
    <template v-for="o in showOperates">
      <div class="mr-10px" :key="o.key" v-if="o.show !== false">
        <template>
          <component
            v-if="o.buildIn"
            :is="o.buildIn"
            :disabled="o.disabled"
            v-bind="o"
            @click="o.action(o)"
          >
            {{ o.name }}
          </component>
          <NormalButton
            v-else
            :icon-type="o.iconType"
            :disabled="o.disabled"
            @click="o.action(o)"
            >{{ o.name }}</NormalButton
          >
        </template>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
import {
  NormalButton,
  NewButton,
  DeleteButton,
  ExportButton,
  FilterButton,
  SaveButton,
  FieldVisableButton,
  DropDownButton,
  EntityButton
} from "../CommonBtn"
export default {
  name: "CommonBtn",
  components: {
    NormalButton,
    NewButton,
    DeleteButton,
    ExportButton,
    FilterButton,
    SaveButton,
    FieldVisableButton,
    DropDownButton,
    EntityButton
  },
  props: {
    operates: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    showOperates() {
      return this.operates.filter((item) => !item.hidden)
    }
  }
}
</script>

<style lang="less" scoped></style>
