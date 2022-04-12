<template>
  <div style="height: auto">
    <el-container>
      <el-header style="padding: 0">
        <el-row class="head_bg">
          <el-col :span="18" :offset="3">
            <el-row>
              <el-col :span="5">
                <div class="logo_img_div">
                  <img
                    src="@/assets/logo1.png"
                    class="logo_img"
                  />
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0">
        <div class="login-bg">
          <el-card class="login" v-if="isLogin">
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
                href="/forgetpassword"
                >忘记密码</a
              >
              <a class="hyperLink" href="/register">免费注册</a>
            </div>
          </el-card>
          <el-card class="register" v-if="isRegister">
            <div>用户注册</div>
            <br />
            <el-form
              ref="registerRef"
              :model="registerForm"
              :rules="registerRules"
            >
              <el-form-item label="用户名：" prop="registerName">
                <el-input
                  v-model="registerForm.registerName"
                  class="w-50 m-2"
                  size="large"
                  placeholder="请输入用户名"
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
              <a class="hyperLink" href="/login">已有账号？点我登录</a>
            </div>
          </el-card>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { reactive, ref, unref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { Lock, User, Iphone } from "@element-plus/icons-vue";
import { setToken } from "@/utils/util";
import { login, register } from "@/api/user";

const registerRef = ref();
const username = ref();
const password = ref();
let isLogin = ref(false);
let isRegister = ref(false);
let toPath = ref();
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

const routerChange = (to) => {
  toPath = to.path;
  if (toPath == "/login") {
    isLogin.value = true;
    isRegister.value = false;
  }
  if (toPath == "/register") {
    isRegister.value = true;
    isLogin.value = false;
  }
};
const route = useRoute();
const router = useRouter();
watchEffect(() => {
  routerChange(route);
});
const userLogin = async () => {
  const data = {
    username: username.value,
    password: password.value,
  };
  const token = await login(data);
  setToken(token);
  ElMessage.success({ message: "登录成功" });
  router.push({path:"/",params:{username:username.value}});
};
const userRegister = async () => {
  const form = unref(registerRef);
  if (!form) return;
  await form.validate((valid) => {
    if (valid) {
      const data = {
        username: registerForm.registerName,
        password: registerForm.registerPassword,
        phone: registerForm.registerPhone
      };
      console.log(JSON.stringify(data))
      const token = register(data);
      ElMessage.success("注册成功");
    } else {
      ElMessage.error("注册失败");
      return false;
    }
  });
};
</script>
<style scoped>
.{
  
}
.login-bg {
  background-image: url(../assets/login.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* width: 100%; */

  position: relative;
  height: 80vh;
}
.login {
  position: absolute;
  left: 40%;
  top: 30%;
  width: 400px;
  height: 300px;
  overflow: auto;
  opacity: 0.9;
}
.register {
  position: absolute;
  left: 40%;
  top: 20%;
  width: 400px;
  height: 450px;
  overflow: auto;
  opacity: 0.9;
}
.hyperLink{
  color: #409eff;
}
</style>