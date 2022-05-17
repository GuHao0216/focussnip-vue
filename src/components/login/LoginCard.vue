<template>
  <el-card class="login">
    <div>用户登录</div>
    <br />
    <el-input
      v-model="username"
      class="w-50 m-2"
      size="large"
      placeholder="请输入用户名"
      :prefix-icon="User"
    />
    <br />
    <br />
    <el-input
      v-model="password"
      class="w-50 m-2"
      size="large"
      placeholder="请输入密码"
      :prefix-icon="Lock"
      type="password"
      show-password
      clearable
    />
    <br />
    <br />
    <el-button
      type="primary"
      size="large"
      style="width: 100%"
      @click="userLogin"
      >登录</el-button
    >
    <br />
    <br />
    <div style="text-align: right">
      <a
        class="hyperLink"
        style="margin-right: 20px"
        @click="router.replace('/forgetpassword')"
        href=""
        >忘记密码</a
      >
      <a class="hyperLink" href="" @click="router.replace('/register')"
        >免费注册</a
      >
    </div>
  </el-card>
</template>
<script setup>
import { setToken, setUsername } from "@/utils/util";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/user";
import { Lock, User, Iphone } from "@element-plus/icons-vue";

const router = useRouter();

const username = ref();
const password = ref();

const userLogin = async () => {
  const data = {
    username: username.value,
    password: password.value,
  };
  const token = await login(data);
  if (token) {
    setToken(token);
    setUsername({ username: data.username });
    ElMessage.success({ message: "登录成功" });
    router.back(-1);
  }
};
</script>
