<template>
  <div class="sider-content overflow-x-auto">
    <JatIcon
      iconName="icon-icon-menu"
      className="icon-collpase color-#fff"
      :rotateY="isMenuCollapse ? 180 : 0"
      @click="onExpand"
    />
    <el-menu
      ref="menu"
      :default-active="defaultActive"
      :unique-opened="true"
      :collapse="isMenuCollapse"
      :collapse-transition="false"
    >
      <template v-for="item in menus">
        <!-- 二级菜单 -->
        <el-submenu
          v-if="item.hasChildren"
          :index="item.path"
          :key="item.name"
          popper-class="jat-menu-popper"
        >
          <template slot="title">
            <JatIcon
              v-if="item.meta.icon"
              :iconName="`local-${item.meta.icon}`"
              className="menu-icon"
            />
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="itemchild in item.children"
            :index="itemchild.path"
            :key="itemchild.path"
            :class="{ 'no-active': Boolean(itemchild.meta.href) }"
            @click.native="handleClick(itemchild)"
          >
            <!-- <JatIcon
              v-if="itemchild.meta.icon"
              className="menu-icon"
              :iconName="`local-${itemchild.meta.icon}`"
            /> -->
            <span>{{ itemchild.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
        <!-- 一级菜单 -->
        <el-menu-item
          v-else
          :index="item.path"
          :key="item.path"
          :class="{ 'no-active': Boolean(item.meta.href) }"
          @click.native="handleClick(item)"
        >
          <el-tooltip
            :disabled="!isMenuCollapse"
            :content="item.meta.title"
            placement="right"
          >
            <JatIcon
              v-if="item.meta.icon"
              className="menu-icon"
              :iconName="`local-${item.meta.icon}`"
            />
          </el-tooltip>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
import JatIcon from "../../../components/JatIcon/JatIcon.vue"
export default {
  name: "NavigationBar",
  components: {
    JatIcon
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      menus: "routeStore/menus",
      isMenuCollapse: "routeStore/isMenuCollapse"
    }),
    defaultActive() {
      if (this.$route.meta.defaultActiveIndex) {
        return this.$route.meta.defaultActiveIndex
      }
      return this.$route.path
    }
  },
  methods: {
    ...mapMutations({
      setMenuCollpase: "routeStore/setMenuCollpase",
      removeCacheRoute: "routeStore/removeCacheRoute",
      addCacheRoute: "routeStore/addCacheRoute"
    }),
    onExpand() {
      this.setMenuCollpase(!this.isMenuCollapse)
    },
    handleClick(item) {
      if (this.$route.path === item.path) {
        return
      }
      console.log(item.path)
      this.removeCacheRoute(item.name)
      this.$router.push(item.path)
      this.$nextTick(() => {
        this.addCacheRoute(item.name)
      })
    }
  }
}
</script>
<style lang="less">
@bgColor: #041c31;
@activebgColor: #0b437e;
@activebgColorSub: #072f58;
@color: #acd3ff;
@activeColor: #fff;
.sider-content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @bgColor;
  background-image: url("@jat-comps/assets/img/menuBackground.png");
  background-repeat: no-repeat;
  background-position: bottom;
  .icon-collpase {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-top: 10px;
    margin-left: 21px;
    margin-bottom: 10px;
  }
  .el-menu {
    background: @bgColor;
    border-right: none;
    overflow: hidden;
    padding: 0 10px;
    .el-menu-item {
      display: flex;
      padding-top: 8px;
      padding-bottom: 8px;
      span {
        display: inline-block;
        white-space: pre-wrap;
      }
    }
    .el-menu-item,
    .el-submenu__title {
      padding-top: 8px;
      padding-bottom: 8px;
      margin-bottom: 12px;
      color: @color;
      height: auto;
      line-height: normal;
      min-height: 35px;
      list-style: none;
      border-radius: 2px;
      padding: 8px 10px !important;
      .el-submenu__icon-arrow {
        color: @color;
      }
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background-color: @activebgColor;
      color: @activeColor;
      font-weight: 600;
    }
    .el-menu-item.no-active:focus {
      background-color: transparent;
    }
    .el-submenu__title:focus,
    .el-submenu__title:hover {
      background-color: @activebgColor;
      color: @activeColor;
      font-weight: 600;
    }
    .el-menu-item:hover,
    .el-submenu__title:hover {
      .el-submenu__icon-arrow {
        color: @color;
      }
    }
    .el-menu-item.is-active,
    .el-submenu__title.is-active {
      background-color: @activebgColor;
      color: @activeColor;
    }
    .menu-icon {
      margin-top: 1px;
      flex-shrink: 0;
      margin-right: 10px;
      width: 16px;
      height: 16px;
    }
    // 二级菜单
    .el-submenu {
      margin-bottom: 12px;
      .el-menu-item {
        margin-bottom: 6px;
        padding-left: 58px !important;
        &:hover,
        &.is-active {
          background-color: @activebgColorSub;
        }
        &.no-active.is-active {
          background-color: transparent;
        }
      }
      .el-menu-item:last-child {
        margin-bottom: 0px;
      }
      .el-menu {
        margin: 0 -10px;
        padding: 0;
      }
    }
    .el-submenu * {
      vertical-align: middle;
    }
    .el-submenu .el-submenu__title {
      display: flex;
      padding-top: 8px;
      padding-bottom: 8px;
      color: @color;
      margin-bottom: 6px;
      height: auto;
      line-height: 1.2;
      min-height: 35px;
      list-style: none;
      border-radius: 2px;
      span {
        display: inline-block;
        white-space: pre-wrap;
        width: 100px;
      }
      .el-submenu__icon-arrow {
        right: 15px;
        top: 20px;
      }
    }
    .el-submenu:hover,
    .el-submenu__title:hover {
      color: @activeColor;
      .el-submenu__icon-arrow {
        color: @activeColor;
      }
    }
  }
  .el-menu--collapse {
    width: 56px;
  }
}
.jat-menu-popper {
  .el-menu {
    background-color: @bgColor;
    .el-menu-item {
      height: 32px;
      font-size: 14px;
      font-weight: 600;
      line-height: 32px;
      letter-spacing: 0;
      color: @color;
      transition: 0s;

      &:hover {
        color: @activeColor;
        background: @activebgColor;
      }
      &.is-active {
        color: @activeColor;
      }
    }
  }
}
</style>
