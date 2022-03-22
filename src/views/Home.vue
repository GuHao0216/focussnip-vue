<template>
  <div class="common-layout" style="height:auto">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
          <HomeMain />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMain from '@/components/main/HomeMain.vue'

export default {
  name: 'Home',
  components: {
    HomeMain
  }
}
</script>