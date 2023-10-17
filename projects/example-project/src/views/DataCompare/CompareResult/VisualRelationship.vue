<template>
  <div
    v-loading="loading"
    class="VisualEntity w-100% h-100% flex-1 bg-white flex flex-col relative"
  >
    <iframe
      class="h-full"
      id="visual_entity"
      :src="iframeURL"
      frameborder="0"
      ref="iframe"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>
<script>
import { getToken } from "@jat-comps/utils/storage"
import { fullScreen, closeFullScreen } from "@jat-comps/utils"
import { localStg } from "@jat-comps/utils/storage"
export default {
  name: "VisualEntity",
  data() {
    return {
      loading: false,
      // eslint-disable-next-line no-undef
      iframeURL: graphURL + "graph",
      isFullScreen: false
    }
  },
  mounted() {
    this.loading = true
    this.init()
    window.addEventListener("message", this.onmessage)
  },
  beforeDestroy() {
    window.removeEventListener("message", this.onmessage)
  },
  methods: {
    init() {},
    onIframeLoad() {
      this.loading = false
      const infoStr = localStg.get("gxt")
      const info = JSON.parse(infoStr)
      console.log(info)
      let messageData = {
        key: "visual-template",
        token: getToken(),
        payload: {
          mbid: info.modelInfo.mbid,
          mrbj: info.modelInfo.mrbj || null,
          sjsql: info.sql
        }
      }
      this.$refs.iframe.contentWindow.postMessage(messageData, "*")
      console.log(
        "传递给可视化的数据------------------------------------",
        messageData
      )
    },
    onmessage(msg) {
      if (msg.data?.key === "visual-fullscreen") {
        this.fullScreen()
      }
    },
    fullScreen() {
      this.isFullScreen = !this.isFullScreen
      const ele = document.querySelector("#visual_entity")
      if (this.isFullScreen) {
        fullScreen(ele)
      } else {
        closeFullScreen()
      }
    }
  }
}
</script>
<style lang="less">
#VisualEntity {
  width: 100%;
  height: 100%;
}
</style>
