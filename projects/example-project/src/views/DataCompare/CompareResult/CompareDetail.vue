<template>
  <div class="h-full p-20px">
    <div class="h-full flex flex-col bg-white p-20px">
      <el-radio-group v-model="activeTab" class="mb-20px height-60px">
        <el-radio-button label="baseinfo">基本信息</el-radio-button>
        <el-radio-button label="compareresult">比对结果</el-radio-button>
      </el-radio-group>
      <BaseInfo v-if="activeTab === 'baseinfo'" :id="curId" />
      <CompareResultDisplay v-else class="flex-1" :id="curId" />
    </div>
  </div>
</template>
<script>
import CompareResultDisplay from "./components/CompareResultDisplay.vue"
import BaseInfo from "./components/BaseInfo.vue"
export default {
  name: "CompareDetail",
  components: {
    BaseInfo,
    CompareResultDisplay
  },
  data() {
    return {
      activeTab: "compareresult",
      curId: ""
    }
  },
  methods: {
    handleClick() {}
  },
  mounted() {
    this.curId = this.$route.query?.id
  }
}
</script>
