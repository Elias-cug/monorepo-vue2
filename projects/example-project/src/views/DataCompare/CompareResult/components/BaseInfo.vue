<template>
  <el-descriptions :columns="1" border>
    <el-descriptions-item label="任务名称">
      {{ data.rwmc }}
    </el-descriptions-item>
    <el-descriptions-item v-if="data.bdwja" label="比对文件1">
      {{ data.bdwja }}
    </el-descriptions-item>
    <el-descriptions-item v-if="data.bdwjb" label="比对文件2">
      {{ data.bdwjb }}
    </el-descriptions-item>
    <el-descriptions-item label="比对内容">
      {{ data.bdnr }}
    </el-descriptions-item>
    <el-descriptions-item label="比对状态">
      {{ data.bdztName }}
    </el-descriptions-item>
    <el-descriptions-item label="比对开始时间">
      {{ data.kssj }}
    </el-descriptions-item>
    <el-descriptions-item label="比对结束时间">
      {{ data.jssj }}
    </el-descriptions-item>
    <el-descriptions-item label="比对结果">
      {{ data.bdjgName }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import { getCompareResultDetailApi } from "@/api/dataCompare"
export default {
  name: "BaseInfo",
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    async getBaseInfo() {
      const fbj = this.$route.query.fbj
      const { data } = await getCompareResultDetailApi({ fbj })
      if (data) {
        console.log(data)
        this.data = data?.data
      }
    }
  },
  mounted() {
    this.getBaseInfo()
  }
}
</script>
