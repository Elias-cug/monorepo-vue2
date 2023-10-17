<template>
  <div>
    <el-dialog
      class="CkDialog"
      :title="title"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="30%"
    >
      <div>{{ content }}</div>
      <span slot="footer" class="dialog-footer flex justify-end">
        <jat-button class="mr-20px" type="info" @click="onCancel">
          取消
        </jat-button>
        <jat-button @click="onConfirm">确定</jat-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "DialogCaseList",
  components: {},
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String,
      default: "提示"
    },
    content: {
      type: String
    }
  },
  data() {
    return {}
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.visible
      },
      set: function (val) {
        this.$emit("update:visible", val)
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit("update:visible", false)
      this.$emit("cancel")
    },
    onConfirm() {
      this.$emit("update:visible", false)
      this.$emit("confirm")
    }
  }
}
</script>
<style lang="less"></style>
