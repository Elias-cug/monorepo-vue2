<template>
  <div class="flex w-full justify-end">
    <div v-for="o in showOperates" class="ml-10px" :key="o.key">
      <component
        v-if="o.buildIn"
        :is="o.buildIn"
        :disabled="o.disabled"
        v-bind="o"
        @click="o.action(o)"
      >
        {{ o.name }}
      </component>
      <CommonBtn
        v-else
        :icon-name="o.iconName"
        :type="o.btnType || o.iconType"
        :disabled="o.disabled"
        @click="o.action(o)"
      >
        {{ o.name }}
      </CommonBtn>
    </div>
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
  EntityButton,
  CommonBtn
} from "../CommonBtn"
export default {
  name: "OperateContainer",
  components: {
    NormalButton,
    NewButton,
    DeleteButton,
    ExportButton,
    FilterButton,
    SaveButton,
    FieldVisableButton,
    DropDownButton,
    EntityButton,
    CommonBtn
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
