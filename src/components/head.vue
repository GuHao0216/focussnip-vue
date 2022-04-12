<template>
  <el-row class="head_bg">
    <el-col :span="18" :offset="3">
      <el-row>
        <el-col :span="5">
          <div class="logo_img_div">
            <img src="@/assets/logo1.png" class="logo_img" />
          </div>
        </el-col>
        <el-col :span="14"> </el-col>
        <el-col :span="5">
          <div
            class="flex flex-wrap items-center"
            style="padding: 6% 0; text-align: right"
          >
            <el-dropdown>
              <el-button type="primary" @click="toLogin()">
                <el-icon style="vertical-align: middle">
                  <avatar />
                </el-icon>
                登录<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>账号设置</el-dropdown-item>
                  <el-dropdown-item>订单管理</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script setup>
// @ is an alias to /src
import { useRouter } from "vue-router";
const router = useRouter();
const toLogin = () => {
  router.push({ path: "login" });
};
</script>
<style>
.logo_img_div {
  height: 150px;
  width: 150px;
}
.logo_img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.head_bg {
  background: aliceblue;
  height: 100%;
}
</style>