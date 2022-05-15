<template>
  <el-row class="head_bg">
    <el-col :span="18" :offset="3">
      <el-row>
        <el-col :span="5">
          <div class="logo_img_div">
            <img src="@/assets/logo1.png" class="logo_img" @click="router.push({ path: '/' });" />
          </div>
        </el-col>
        <el-col :span="5" :offset="14">
          <div
            style="padding: 6% 0;float:right "
          >
            <el-dropdown>
              <el-button type="primary" @click="toLogin()">
                <el-icon style="vertical-align: middle">
                  <avatar />
                </el-icon>
                {{loginName}}<el-icon v-if="isShow" class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown v-if="isShow">
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>账号设置</el-dropdown-item>
                  <el-dropdown-item>订单管理</el-dropdown-item>
                  <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
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
import { computed,inject } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getToken,clearToken,getUsername } from "@/utils/util";
const router = useRouter();
const reload = inject('reload')
const isShow = computed(()=>{
  if(getToken() != ''){
    return true;
  }
  return false;
})
const loginName = computed(()=>{
  const name = getUsername()
  if(getToken() != ''){
    return name;
  }
  return "登录";
})
const toLogin = () => {
  if(!(isShow.value)){
  router.push({ path: "login" });   
  }
 
};
const exitLogin = () =>{
  clearToken()
  ElMessage.success("登出成功");
  reload();
}
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
  cursor:pointer;
}
.head_bg {
  background: aliceblue;
  height: 100%;
}
</style>