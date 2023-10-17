<template>
  <div class="jat-batch-compare p-16px h-full w-full flex flex-col">
    <div class="uploadMain">
      <div
        class="bg-white shadow rounded upload"
        v-for="(item, index) in files"
        :key="item.id"
      >
        <div class="upload-head" v-text="`比对文件${index + 1}`"></div>
        <el-upload
          drag
          action="#"
          :limit="1"
          :show-file-list="false"
          :before-upload="(e) => onBeforeUpload(e, item)"
          v-if="!item.file"
        >
          <div class="upload-body">
            <i class="el-icon-upload"></i>
            <div class="text-black">点击或将文件拖拽到这里上传</div>
            <div class="text-sm">
              文件格式仅支持:csv,xls,xlsx;文件大小限制10M
            </div>
          </div>
        </el-upload>
        <div class="upload-list" v-else>
          <span v-text="item.file.name"></span>
          <el-link
            :underline="false"
            class="upload-delete"
            @click="deleteFile(item)"
            >删除
          </el-link>
        </div>
      </div>
    </div>
    <div class="jat-batch-button bg-white rounded shadow">
      <jat-button type="primary" class="shadow" @click="compare"
        >开始比对
      </jat-button>
    </div>
    <base-dialog
      :visible="compareVisible"
      @close="compareVisible = false"
      top="20%"
      width="40%"
    >
      <template #header>
        <div class="dialog-header">
          <span>提示</span>
        </div>
      </template>
      <div class="dialog-body">
        <span class="inline-block py-40px">正在进行数据碰撞对比，请稍后~</span>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <jat-button
            type="info"
            class="rounded-md"
            @click="compareVisible = false"
            >关闭
          </jat-button>
          <jat-button type="primary" class="rounded-md" @click="compareResult"
            >查看对比结果
          </jat-button>
        </div>
      </template>
    </base-dialog>
  </div>
</template>
<script>
import BaseDialog from "./dialog/BaseDialog.vue"

const acceptFile = ["csv", "xls", "xlsx"]
const acceptFileSize = 10 * 1024 * 1024
let existFile = null

function verifyFileExt(str) {
  const par = /\.(\w+)$/
  if (str) {
    const ext = par.exec(str)
    return acceptFile.includes(ext[1])
  }
  return false
}

function verifyFileSize(size) {
  return size <= acceptFileSize
}

export default {
  components: {
    BaseDialog
  },
  data() {
    return {
      compareVisible: false,
      files: [
        {
          id: "fileOne",
          file: null
        },
        {
          id: "fileTwo",
          file: null
        }
      ]
    }
  },
  watch: {
    files: {
      handler(v) {
        if (v[0].file === null && v[1].file === null) {
          existFile = null
        }
      },
      deep: true
    }
  },
  methods: {
    compare() {
      const flg = this.files.some((e) => e.file === null)
      if (flg) {
        this.$message.warning("请上传比对文件")
        return
      }
      this.compareVisible = true
    },
    compareResult() {
      this.$router.push({ name: "CompareResult" })
    },
    onBeforeUpload(e, k) {
      const flgExt = verifyFileExt(e.name)
      if (!flgExt) {
        this.$message.warning("文件格式仅支持csv,xls,xlsx")
        return false
      }
      console.log(this.files, "---")
      if (existFile && existFile === `${e.name}-${e.size}`) {
        this.$message.warning("对比文件已存在")
        return false
      }
      const flgSize = verifyFileSize(e.size)
      if (!flgSize) {
        this.$message.warning("文件不能超过10M")
        return false
      }
      existFile = `${e.name}-${e.size}`
      k.file = e
    },
    deleteFile(v) {
      v.file = null
    }
  }
}
</script>
<style lang="less" scoped>
.upload-head {
  width: 100%;
  height: 35px;
  background: rgba(242, 242, 242, 1);
  line-height: 35px;
  text-align: center;
  color: black;

  + div {
    height: calc(100% - 35px);
    width: 100%;
  }
}

.uploadMain {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.upload {
  margin: 0 40px;
  width: 400px;
  height: 400px;
}

:deep(.el-upload) {
  width: 100%;
  height: 100%;

  .el-upload-dragger {
    height: 100%;
    width: 100%;
    border: unset;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.upload-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  * {
    margin: 10px 0;
  }

  div:last-child {
    color: #a3a3a3;
  }
}

.upload-list {
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 10px;

  .upload-delete {
    color: #e85050;
    margin: 0 10px;

    &:hover {
      color: red;
    }
  }
}

.jat-batch-button {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.dialog-body {
  padding: 60px 0;
  font-size: 16px;
}

.dialog-footer {
  .rounded-md {
    margin: 0 5px;
  }
}
</style>
