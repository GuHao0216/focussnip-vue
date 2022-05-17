<template>
  <el-card class="register">
    <div>找回密码</div>
    <br />
    <el-form ref="forgetRef" :model="forgetForm" :rules="forgetRules">
      <el-form-item label="用户名称：" prop="forgetName">
        <el-input
          v-model="forgetForm.forgetName"
          class="w-50 m-2"
          size="large"
          placeholder="请输入用户名称"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item label="新的密码：" prop="forgetPassword">
        <el-input
          v-model="forgetForm.forgetPassword"
          class="w-50 m-2"
          size="large"
          placeholder="请输入新密码"
          :prefix-icon="Lock"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码：" prop="forgetRepeatPassword">
        <el-input
          v-model="forgetForm.forgetRepeatPassword"
          class="w-50 m-2"
          size="large"
          placeholder="重复输入密码"
          :prefix-icon="Lock"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item label="手机号码：" prop="forgetPhone">
        <el-input
          v-model="forgetForm.forgetPhone"
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
      @click="userforget"
      >提交</el-button
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
import { login, forget } from "@/api/user";

const route = useRoute();
const router = useRouter();
const forgetRef = ref();
const forgetForm = reactive({
  forgetName: "",
  forgetPassword: "",
  forgetRepeatPassword: "",
  forgetPhone: "",
});
const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入确认密码"));
  } else if (value !== forgetForm.forgetPassword) {
    callback(new Error("两次密码不一致，请重新输入"));
  } else {
    callback();
  }
};
const forgetRules = reactive({
  forgetName: [{ required: true, message: "用户名不为空", trigger: "blur" }],
  forgetPassword: [
    { required: true, message: "密码不为空", trigger: "blur" },
  ],
  forgetRepeatPassword: [
    { required: true, message: "确认密码不为空", trigger: "blur" },
    { validator: validatePassword, trigger: "blur" },
  ],
  forgetPhone: [
    { required: true, message: "手机号不为空", trigger: "blur" },
    { min: 11, max: 11, message: "手机号需为11位数字" },
  ],
});
const userforget = async () => {
  const form = unref(forgetRef);
  if (!form) return;
  await form.validate(async (valid) => {
    if (valid) {
      const data = {
        username: forgetForm.forgetName,
        newPassword: forgetForm.forgetPassword,
        phone: forgetForm.forgetPhone,
      };
      const msg = await forget(data);
      if(!msg)
      ElMessage.error("修改密码失败");
      else{
      ElMessage.success("修改密码成功");
      router.replace('/login')  
      }
      
    } else {
      ElMessage.error("修改密码失败");
      return false;
    }
  });
};
</script>