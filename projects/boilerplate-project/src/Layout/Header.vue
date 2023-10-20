<template>
  <div>
    <div class="HeaderComponent">
      <div class="HeaderComponent__Logo">
        <JatIcon class-name="logo" :icon-name="`local-${appInfo?.icon}`" />
        <span class="HeaderComponent__Logo__Title">{{ appName }}</span>
      </div>
      <div class="HeaderComponent__UserCenter">
        <span class="text-white cursor-pointer mr-12px" @click="changeTheme">
          {{ theme }}
        </span>
        <span class="HeaderComponent__UserCenter__IMG"></span>
        <span class="HeaderComponent__UserCenter__Name">{{ userName }}</span>
        <span class="HeaderComponent__UserCenter__Divider"></span>
        <span
          @click="logout"
          class="HeaderComponent__UserCenter__Logout"
        ></span>
      </div>
    </div>
    <ConfirmDialog
      content="是否确定退出登录？"
      @confirm="onConfirm"
      :visible.sync="showConfirm"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import { toLogin } from "@jat-comps/utils"
import { ConfirmDialog, JatIcon } from "@jat-comps/components"
import { logout } from "@/api/auth"
export default {
  name: "FxHeader",
  components: {
    ConfirmDialog,
    JatIcon
  },
  computed: {
    ...mapGetters({
      appName: "appStore/appName",
      appInfo: "appStore/appInfo",
      appId: "appStore/appId",
      theme: "appStore/theme",
      userName: "userStore/userName"
    })
  },
  data() {
    return {
      showConfirm: false
    }
  },
  methods: {
    ...mapMutations({
      SET_TASK_DETAIL: "task/SET_TASK_DETAIL",
      setTheme: "appStore/setTheme"
    }),
    logout() {
      this.showConfirm = true
    },
    changeTheme() {
      const curTheme = this.theme === "default" ? "black" : "default"
      this.setTheme(curTheme)
    },
    async onConfirm() {
      const { error } = await logout()
      if (!error) {
        toLogin()
      }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less" scoped>
.HeaderComponent {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 30px 0 30px;
  line-height: 50px;
  box-sizing: border-box;

  .HeaderComponent__Logo {
    height: 50px;
    display: flex;
    align-items: center;
    .logo {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }

    .HeaderComponent__Logo__Title {
      // font-family: PingFangSC-Medium;
      font-size: 20px;
      font-weight: 500;
      letter-spacing: 0;
      color: #fff;
    }
  }

  .HeaderComponent__UserCenter {
    display: flex;
    align-items: center;
    height: 50px;

    .HeaderComponent__UserCenter__IMG {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 4px;
      background: url("@/assets/img/headerComponent/user.png") no-repeat;
      background-size: cover;
    }

    .HeaderComponent__UserCenter__Name {
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: 0;
      color: #fff;
    }

    .HeaderComponent__UserCenter__Divider {
      display: inline-block;
      width: 1px;
      height: 16px;
      margin: 0 10px;
      background: #fff;
    }

    .HeaderComponent__UserCenter__Notice {
      display: inline-block;
      width: 18px;
      height: 16px;
      cursor: pointer;
      background: url("@/assets/img/headerComponent/notice.png") no-repeat;
      background-size: cover;
    }

    .HeaderComponent__UserCenter__Settings {
      display: inline-block;
      width: 18px;
      height: 16px;
      margin: 0 15px;
      cursor: pointer;
      background: url("@/assets/img/headerComponent/setting.png") no-repeat;
      background-size: cover;
    }

    .HeaderComponent__UserCenter__Logout {
      display: inline-block;
      width: 18px;
      height: 16px;
      cursor: pointer;
      background: url("@/assets/img/headerComponent/logout.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>
<style lang="less">
.HeaderComponent {
  .noticeNum {
    display: flex;

    .el-badge__content {
      height: 14px;
      padding: 0 4px;
      line-height: 14px;
      border: none;
    }
  }
}
</style>
