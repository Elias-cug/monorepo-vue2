<template>
  <div class="global-tab">
    <div
      v-clickoutside="handleClickOutside"
      v-if="contextmenuFlag"
      class="contextMenu"
      :style="{ left: contentmenuX + 'px', top: contentmenuY + 'px' }"
    >
      <el-card :body-style="{ padding: '10px 0' }">
        <div class="more-wrap flex flex-col mb--8px">
          <div
            class="more-item py-4px mb-8px"
            :style="m.style || {}"
            v-for="m in showTabOperates"
            :key="m.key"
            @click="m.action(contextTab)"
          >
            {{ m.title }}
          </div>
        </div>
      </el-card>
    </div>
    <el-tabs
      class="jat-tab"
      :value="$route.path"
      type="card"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        v-for="(item, index) in openTab"
        :key="item.path + '__' + index"
        :label="item.name"
        :name="item.path"
        :query="item.query || {}"
        :closable="item.name !== rootMenu?.meta.title"
      >
        <span
          :title="item.name"
          slot="label"
          class="tab-item inline-block w-full"
          @contextmenu.prevent="
            ($event) => {
              onContextMenu($event, item, index)
            }
          "
          >{{ item.name }}</span
        >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import { showTabOperates } from "./helper"
import { sessionStg } from "../../../utils"
export default {
  name: "GloablTab",
  data() {
    return {
      showTabOperates,
      curClickTab: -1,
      contextmenuFlag: false,
      contentmenuX: -10000,
      contentmenuY: -10000,
      contextTab: null
    }
  },
  computed: {
    ...mapGetters({
      openTab: "tabStore/openTab",
      openTabMaxLength: "tabStore/openTabMaxLength",
      isCollapse: "tabStore/isCollapse",
      rootMenu: "routeStore/rootMenu"
    })
  },
  watch: {
    "$route.path": {
      handler(newVal) {
        const changeMeta = this.$route.meta.changeMeta
        let data = {
          path: newVal,
          name: changeMeta
            ? this.$route.params[changeMeta]
            : this.$route.meta.title,
          componentName: newVal.slice(1),
          query: this.$route.query
        }
        this.$store.commit("tabStore/setActiveTab", {
          ...data
        })
        this.ADD_TABS(data) // 将当前页面增加到tab 队列
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations({
      ADD_TABS: "tabStore/ADD_TABS",
      DELETE_TABS: "tabStore/DELETE_TABS"
    }),
    tabClick(item) {
      if (item.name !== this.$route.path) {
        this.$router.push({ path: item.name, query: item.$attrs.query })
        this.$store.commit("tabStore/setActiveTab", {
          path: item.name,
          query: item.$attrs.query
        })
      }
    },
    tabRemove(targetName) {
      let closeIndex = -1
      this.openTab.forEach((i, index) => {
        if (i.path === targetName) {
          closeIndex = index
        }
      })
      if (closeIndex == 0) {
        return
      }
      let confirm = () => {
        if (targetName === this.$route.path) {
          // 如果移除tab标签就是当前激活路由，那么push到前一个页面
          let route = this.openTab[closeIndex - 1]
          this.$router.push({ path: route.path, query: route.query })
        }
        this.DELETE_TABS(targetName)
      }
      confirm()
    },
    saveTabToSession() {
      sessionStg.set("openTab", JSON.stringify(this.openTab))
    },
    onContextMenu(event, item, index) {
      // if (index === 0) {
      //   return
      // }
      this.contentmenuX = event.clientX
      this.contentmenuY = event.clientY
      this.contextmenuFlag = true
      this.contextTab = {
        tab: item,
        index
      }
    },
    handleClickOutside() {
      this.contextmenuFlag = false
    }
  },
  mounted() {
    window.addEventListener("beforeunload", this.saveTabToSession)
    let openTab = sessionStg.get("openTab")
    if (openTab) {
      this.$store.state.tabStore.openTab = JSON.parse(openTab)
    }
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.saveTabToSession)
  }
}
</script>
<style lang="less">
.global-tab {
  position: relative;
  .jat-tab {
    height: 30px;
    background: #dbdde8;

    .el-tabs__header {
      margin: 0;
      border-bottom: 0;

      .el-tabs__nav {
        border: 0;
        border-radius: 0;
      }
    }

    .el-tabs__item {
      position: relative;
      width: auto;
      height: 30px;
      min-width: 160px;
      padding: 0 16px !important;
      padding-right: 30px !important;
      line-height: 30px;
      color: #333;
      border: none !important;
      transition: 0s !important;
      background: #e8ebf6;
      border-radius: 2px 2px 0px 0px;
      width: 160px;
      .tab-item {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.is-active,
      &:hover {
        font-weight: 600;
        // color: #1b77ff;
        background: #fff;
        border: none !important;
        border-radius: 0 !important;
      }

      .el-icon-close {
        position: absolute !important;
        top: 8px !important;
        right: 10px !important;
        width: 14px !important;
        font-weight: bold;
        line-height: 14px;
        transition: 0s !important;
      }
    }

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 30px;
    }
  }
  .contextMenu {
    position: fixed;
    z-index: 20;
  }
  .more-wrap {
    width: 120px;
    font-size: 14px;
    .more-item {
      padding: 8px 14px;
      cursor: pointer;
      color: #167cf3;
      &:hover {
        background: #ebeff4;
      }
    }
  }
}
</style>
