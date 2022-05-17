<template>
  <el-card class="register">
    <div>用户注册</div>
    <br />
    <el-form ref="registerRef" :model="registerForm" :rules="registerRules">
      <el-form-item label="用户名称：" prop="registerName">
        <el-input
          v-model="registerForm.registerName"
          class="w-50 m-2"
          size="large"
          placeholder="请输入用户名称"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item label="输入密码：" prop="registerPassword">
        <el-input
          v-model="registerForm.registerPassword"
          class="w-50 m-2"
          size="large"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码：" prop="registerRepeatPassword">
        <el-input
          v-model="registerForm.registerRepeatPassword"
          class="w-50 m-2"
          size="large"
          placeholder="重复输入密码"
          :prefix-icon="Lock"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="手机号码：" prop="registerPhone">
        <el-input
          v-model="registerForm.registerPhone"
          class="w-50 m-2"
          size="large"
          placeholder="请输入手机号"
          :prefix-icon="Iphone"
        />
      </el-form-item>
    </el-form>
    <br />
    <el-button
      type="primary"
      size="large"
      style="width: 100%"
      @click="userRegister"
      >注册</el-button
    >
    <br />
    <br />
    <div style="text-align: right">
      <a class="hyperLink" href="" @click="router.replace('/login')"
        >已有账号？点我登录</a
      >
    </div>
  </el-card>
</template>
<script setup>
import { reactive, ref, unref, watchEffect } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ElMessage } from "element-plus";
import { Lock, User, Iphone } from "@element-plus/icons-vue";
import { setToken, setUsername } from "@/utils/util";
import { login, register } from "@/api/user";

const route = useRoute();
const router = useRouter();
const registerRef = ref();
const registerForm = reactive({
  registerName: "",
  registerPassword: "",
  registerRepeatPassword: "",
  registerPhone: "",
});
const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入确认密码"));
  } else if (value !== registerForm.registerPassword) {
    callback(new Error("两次密码不一致，请重新输入"));
  } else {
    callback();
  }
};
const registerRules = reactive({
  registerName: [{ required: true, message: "用户名不为空", trigger: "blur" }],
  registerPassword: [
    { required: true, message: "密码不为空", trigger: "blur" },
  ],
  registerRepeatPassword: [
    { required: true, message: "确认密码不为空", trigger: "blur" },
    { validator: validatePassword, trigger: "blur" },
  ],
  registerPhone: [
    { required: true, message: "手机号不为空", trigger: "blur" },
    { min: 11, max: 11, message: "手机号需为11位数字" },
  ],
});
const userRegister = async () => {
  const form = unref(registerRef);
  if (!form) return;
  await form.validate(async (valid) => {
    if (valid) {
      const data = {
        username: registerForm.registerName,
        password: registerForm.registerPassword,
        phone: registerForm.registerPhone,
        //TODO：权限划分,暂且为1 用户，2 star，3 admin
        roleId: 1
      };
      const token = await register(data);
      if(!token)
      ElMessage.error("注册失败");
      else{
      ElMessage.success("注册成功");
      router.replace('/login')  
      }
      
    } else {
      ElMessage.error("注册失败");
      return false;
    }
  });
};
</script>