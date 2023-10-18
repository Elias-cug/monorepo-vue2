<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="flex flex-col w-400px">
      <span class="text-3xl flex justify-center mb-20px">登录</span>
      <div class="flex h-full items-center mb-20px">
        <el-input v-model="username" placeholder="用户名" />
      </div>
      <div class="flex h-full items-center mb-20px">
        <el-input v-model="password" placeholder="密码" />
      </div>
      <el-button class="w-full mb-20px" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
// import { loginApi } from "../../../api/auth"
import { setToken } from "../../../utils/storage/index"
export default {
  data() {
    return {
      username: "admin",
      password: "RtcjWNRuB5ngD17iBzGO7Q=="
    }
  },
  methods: {
    login() {
      this.$router.push({ path: "/" })
      setToken("token")
      // loginApi(this.username, this.password).then((res) => {
      //   if (res?.data?.code === "200") {
      //     setToken(res?.data?.msg)
      //     this.$router.push({ path: "/" })
      //   }
      // })
    }
  }
}
</script>
