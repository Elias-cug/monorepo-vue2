<template>
  <div
    class="batch-compare w-full h-full"
    v-loading="loading"
    element-loading-text="数据碰撞比对中，比对完成后，在结果页面点击【详情】查看结果数据"
  >
    <div class="w-full justify-center pt-100px">
      <div class="flex justify-center items-center text-32px">
        <img class="mr-12px" src="../../../assets/img/jingcha-logo.png" />
        <div class="title">数据碰撞比对</div>
      </div>
    </div>
    <div class="h-full w-full p-20px flex justify-center mt-40px">
      <div
        v-clickoutside="onClickoutside"
        class="w-691px relative w-full flex flex-col"
      >
        <el-radio-group v-model="radioType">
          <el-radio v-for="o in radioList" :key="o.fbj" :label="o.label">{{
            o.name
          }}</el-radio>
        </el-radio-group>
        <div class="flex w-691px relative w-full relative mt-16px">
          <div class="w-full flex items-center">
            <div class="search w-full relative">
              <el-input
                :placeholder="placeholders[radioType]"
                v-model.trim="searchVal"
                size="small"
                :maxlength="40"
              >
              </el-input>
              <div
                class="absolute top-4px right-18px cursor-pointer w-40px h-40px flex items-center justify-center"
                @click="openFileUpload"
              >
                <img
                  class="uploadBtn"
                  src="../../../assets/img/upload.png"
                  alt=""
                  title="批量碰撞比对"
                  :draggable="false"
                />
              </div>
            </div>
            <CommonBtn
              class="w-100px h-50px shrink-0 mt--7px ml--15px z-30px relative"
              fill
              @click="onCompare"
              >开始比对</CommonBtn
            >
          </div>

          <div
            class="search_upload absolute w-full top-49px left-0"
            v-if="fileOpen"
          >
            <img
              class="cursor-pointer absolute top-6px right-20px"
              src="@/assets/img/close_normal.png"
              alt=""
              @click="fileOpen = false"
              :draggable="false"
            />
            <el-upload
              class="upload-demo"
              :on-change="onChangeFile"
              drag
              action=""
              :auto-upload="false"
              :multiple="false"
              :show-file-list="false"
            >
              <img :draggable="false" src="@/assets/img/upload_bg.png" alt="" />
              <div class="upload-body">
                <div class="text-black">拖入文件上传进行数据碰撞比对</div>
                <div class="text-sm">
                  文件格式仅支持:csv,xls,xlsx;文件大小限制10M
                </div>
              </div>
              <el-button type="primary" size="small" class="el-button-normal"
                >上传文件</el-button
              >
            </el-upload>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CommonBtn } from "@jat-comps/components"
import { compareApi, getBusinessObjectListApi } from "@/api/dataCompare"
import { verifyFileSize, verifyFileExt } from "@/views/DataCompare/share"
const placeholders = {
  RY: "请输入身份证号",
  ZH: "请输入银行卡号",
  AJ: "请输入案件编号或案件名称"
}

export default {
  name: "BatchCompareNew",
  components: {
    CommonBtn
  },
  data() {
    return {
      radioList: [],
      radioType: "",
      fileOpen: false,
      file: null,
      searchVal: "",
      fileInfo: null,
      loading: false
    }
  },
  methods: {
    openFileUpload() {
      this.$nextTick(() => {
        this.fileOpen = true
      })
    },
    onBeforeUpload(e) {
      const flgExt = verifyFileExt(e.name)
      if (!flgExt) {
        this.$message.warning("文件格式仅支持csv,xls,xlsx")
        return false
      }
      const flgSize = verifyFileSize(e.size)
      if (!flgSize) {
        this.$message.warning("文件不能超过10M")
        return false
      }
      return true
    },
    onClickoutside() {
      this.fileOpen = false
    },
    async onChangeFile(file) {
      if (!this.onBeforeUpload) {
        return
      }
      this.loading = true
      const param = {
        bdlx: "1",
        dxbm: this.radioType
      }
      let formData = new FormData()
      formData.append("file", file.raw)
      const { data } = await compareApi(param, formData)
      if (data) {
        this.toResultPage()
      } else {
        this.loading = false
      }
    },
    async onCompare() {
      if (!this.searchVal) {
        this.$message.info("请输入比对内容")
        return
      }
      this.loading = true
      const param = {
        bdlx: "0",
        dxbm: this.radioType,
        ztz: this.searchVal
      }
      const { data } = await compareApi(param)
      if (data) {
        this.toResultPage()
      } else {
        this.loading = false
      }
    },
    toResultPage() {
      setTimeout(() => {
        this.$router.push({
          path: "/jat-sjpzbd/pzbdjg"
        })
        this.loading = false
      }, 1200)
    },
    async getBusinessObjectList() {
      const { data } = await getBusinessObjectListApi()
      if (data) {
        this.radioList = data?.data.map((item) => {
          return {
            label: item.dxbm,
            name: item.dxmc,
            fbj: item.fbj,
            zd: JSON.parse(item.zd)
          }
        })
        if (this.radioList.length) {
          this.radioType = this.radioList[0].label
          const objTmp = {}
          this.radioList.forEach((item) => {
            const keys = (item.zd || []).map((item) => item.zdmc).join("、")
            objTmp[item.label] = `请输入${keys}`
          })
          this.placeholders = objTmp
        }
      }
    }
  },
  mounted() {
    // const { data } = getBusinessType()
    // if (data) {
    //   console.log(data)
    // }
    this.getBusinessObjectList()
  },
  created() {
    this.placeholders = placeholders
  }
}
</script>
<style lang="less" scoped>
.file-upload {
  border: 1px solid grey;
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
.search_upload {
  height: 307px;
  box-sizing: border-box;
  padding: 30px 20px 20px 20px;
  background: hsla(0, 0%, 100%, 0.95);
  border: 1px solid #c6d5e2;
  box-shadow: 0 2px 8px 0 #b3c7de;
  /deep/.el-upload {
    width: 100%;
    .el-upload-dragger {
      border: none;
      background: #f2f7fc;
      border-radius: 2px;
      width: 100%;
      height: 250px;
      img {
        padding-top: 20px;
        width: 82px;
        margin-bottom: 4px;
      }
      .el-upload__text {
        color: #666;
        margin-bottom: 18px;
      }
    }
  }
  .el-button-normal {
    background-color: #1e93ff;
  }
}
.batch-compare {
  background-image: url("../../../assets/img/bd-bg.png");
  background-size: cover;
  .title {
    font-famaily: Avenir, Helvetica, Arial, sans-serif;
  }
  .search {
    padding: 8px;
    height: 58px;
    background-image: url("../../../assets/img/search_bg_normal.png");
    background-size: 100% 100%;
    &:hover {
      background-image: url("../../../assets/img/search_bg_hover.png");
    }
    input {
      border: none;
    }
    /deep/ .el-input__inner {
      border-color: transparent;
    }
  }
}
</style>
