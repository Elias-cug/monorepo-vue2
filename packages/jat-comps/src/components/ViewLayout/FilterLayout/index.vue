<template>
  <div class="filter-wrap w-full" :style="boxStyle">
    <div class="filter-title flex justify-between px-20px" :style="titleStyle">
      <div
        class="title h-full flex items-center"
        :class="!showBeforeContent && 'hiddenBeforeContent'"
      >
        {{ title }}
      </div>
      <div
        v-if="showExpand"
        class="icon h-full flex items-center cursor-pointer"
        @click="onExpand"
      >
        <el-tooltip :content="isExpand ? '收起' : '展开'">
          <ExpandIcon :rotate="isExpand ? '180' : '0'" />
        </el-tooltip>
      </div>
    </div>
    <div
      class="px-20px py-16px"
      :style="{ display: isExpand ? 'block' : 'none' }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { ExpandIcon } from "@jat-comps/components/SvgIcon"

export default {
  name: "FilterLayout",
  components: {
    ExpandIcon
  },
  props: {
    showExpand: {
      type: Boolean,
      default: true
    },
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    boxStyle: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      default: "查询"
    },
    showBeforeContent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isExpand: true
    }
  },
  methods: {
    onExpand() {
      this.isExpand = !this.isExpand
    }
  }
}
</script>

<style scope lang="less">
.filter-wrap {
  background: #ffffff;
  border-radius: 4px;
}
.filter-title {
  height: 40px;
  border-radius: 4px;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #000000;
    letter-spacing: 0;
    font-weight: 600;
    &::before {
      content: "";
      margin-right: 6px;
      width: 2px;
      height: 16px;
      background-image: linear-gradient(180deg, #1c83fb 0%, #0054b7 100%);
    }
    &.hiddenBeforeContent::before {
      display: none;
    }
  }
}
</style>
