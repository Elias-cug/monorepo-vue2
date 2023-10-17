<template>
  <div class="list-operate flex">
    <div
      class="cursor-pointer mr-8px"
      v-for="o in fixedOperates"
      :key="o.key"
      :style="o.style || {}"
      :class="{
        'display-none': o.displaynone ? o.displaynone(curRow) : false
      }"
      @click="o.action(o, curRow)"
    >
      {{ o.title }}
    </div>
    <div v-if="moreOperates.length">
      <el-popover
        popper-class="list-popover"
        trigger="hover"
        placement="bottom-end"
        :visible-arrow="false"
        :close-delay="100"
        :open-delay="100"
      >
        <div class="more-wrap flex flex-col mb--8px">
          <div
            class="more-item py-4px mb-8px"
            :style="m.style || {}"
            v-for="m in moreOperates"
            :key="m.key"
            @click="m.action(m, curRow)"
          >
            {{ m.title }}
          </div>
        </div>
        <div slot="reference" class="h-full flex items-center cursor-pointer">
          <jat-icon iconName="icon-icon-more" />
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import JatIcon from "../JatIcon/JatIcon.vue"

export default {
  name: "ListOperate",
  components: {
    JatIcon
  },
  props: {
    operates: {
      type: Array,
      default: () => []
    },
    curRow: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    showOperates() {
      return this.operates.filter((item) => !item.hidden)
    },
    fixedOperates() {
      return this.showOperates.filter(
        (item) => !item.type || item.type === "fixed"
      )
    },
    moreOperates() {
      return this.showOperates.filter((item) => item.type === "more")
    }
  }
}
</script>

<style lang="less">
.list-operate {
  color: #167cf3;
}
.list-popover {
  padding: 10px 0 !important;
  .more-wrap {
    .more-item {
      padding-left: 14px;
      cursor: pointer;
      color: #167cf3;
      &:hover {
        background: #ebeff4;
      }
    }
  }
}
</style>
