<template>
  <div class="home">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <el-row>
        <el-col :span="18" :offset="3">
          <el-main>
            <HomeMain />
          </el-main>
        </el-col>
      </el-row>
      <!-- <el-footer>Footer</el-footer> -->
      <el-backtop :right="100" :bottom="100" />
    </el-container>
  </div>
</template>

<script setup>
// @ is an alias to /src
import HomeMain from "@/components/main/HomeMain.vue";
import Head from "@/components/head.vue";

</script>
<style scoped>
.home {
  height: auto;
}
.el-header {
  padding: 0;
}
.el-main {
  padding: 0;
  overflow-x:hidden;
}
</style>