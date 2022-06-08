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
                    src="https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/logo1.png"
                    class="logo_img"
                    @click="router.push({ path: '/' })"
                  />
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0">
        <div class="login-bg">
          <LoginCard v-if="isLogin" />
          <Register v-if="isRegister" />
          <ForgetPassword v-if="isForgetPassword" />
        </div>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>
<!-- <script>
export default {
  beforeRouteEnter: (to, from, next) => {
    //to 到哪里去
    //form 从哪里来
    let path = from.path
    next((vm) => {
      vm.fromPath = path
      console.log(vm.fromPath)
    });
  },
};
</script> -->
<!-- <script>
import { defineComponent } from "vue";

export default defineComponent({
  beforeRouteEnter(to, from, next) {
    // Do somethings
    let path = from.path;
    next((vm) => {
      // vm.getFromPath(path);
      console.log(vm)
    });
  },
});
</script> -->
<script setup>
// @ is an alias to /src
import { onMounted, reactive, ref, unref, watchEffect } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import Vrouter from "@/router";
import { ElMessage } from "element-plus";
import { Lock, User, Iphone } from "@element-plus/icons-vue";
import { setToken, setUsername } from "@/utils/util";
import { login, register } from "@/api/user";
import LoginCard from "@/components/login/LoginCard.vue";
import Register from "@/components/login/Register.vue";
import ForgetPassword from "@/components/login/ForgetPassword.vue";

const route = useRoute();
const router = useRouter();

let isLogin = ref(false);
let isRegister = ref(false);
let isForgetPassword = ref(false);
let toPath = ref();

const routerChange = (rt) => {
  // console.log(rt);
  toPath = rt.path;
  isLogin.value = false;
  isRegister.value = false;
  isForgetPassword.value = false;

  if (toPath == "/login") {
    isLogin.value = true;
  }
  if (toPath == "/register") {
    isRegister.value = true;
  }
  if (toPath == "/forgetpassword") {
    isForgetPassword.value = true;
  }
};

watchEffect(() => {
  routerChange(route);
});

// onMounted(() => {
//   openPage(route.path);
// });

// const getFromPath = (path) => {
//   fromPath = path;
//   console.log(fromPath);
// };
</script>
<style scoped>
.login-bg {
  background-image: url(https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/login.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  /* width: 100%; */

  position: relative;
  height: 80vh;
}
.login {
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 150px);
  width: 400px;
  height: 300px;
  overflow: auto;
  opacity: 0.9;
}

.register {
  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 150px);
  width: 400px;
  height: auto;
  overflow: auto;
  opacity: 0.9;
}
</style>
<style>
.hyperLink {
  color: #409eff;
}
</style>