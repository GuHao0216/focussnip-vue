<template>
  <div class="home">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-row style="padding: 2% 0">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }"
                  >个人中心</el-breadcrumb-item
                >
                <el-breadcrumb-item
                  ><a href="/">订单管理 </a></el-breadcrumb-item
                >
              </el-breadcrumb>
              <br />
              <el-row style="width: 100%">
                <el-table :data="products" stripe style="width: 100%">
                  <el-table-column
                    align="center"
                    label="订单号"
                    prop="order_id"
                  ></el-table-column>
                  <el-table-column
                    align="center"
                    label="订单商品信息"
                    width="280"
                  >
                    <template #default="scope">
                      <el-card
                        :key="scope"
                        :body-style="{ padding: '0px' }"
                        @click="openProductDetail(scope.row.goodsId)"
                        shadow="never"
                      >
                        <el-row>
                          <el-col :span="8">
                            <img
                              :src="scope.row.picture"
                              style="width: 100%; height: 100%"
                              class="carousel_item"
                            />
                          </el-col>
                          <el-col :span="16">
                            <div class="card-text" :title="scope.row.goodsName">
                              <span>{{ scope.row.goodsName }}</span>
                              <div class="card-text">
                                <span
                                  >{{
                                    subDateTime(scope.row.marketTime)
                                  }}&nbsp;</span
                                >
                              </div>
                              <div>
                                <span>{{ scope.row.tip }}</span>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" prop="count" label="数量" />
                  <el-table-column align="center" label="订单金额">
                    <template #default="scope">
                      <!-- <div style="font: bold 18px large"> -->
                      ￥{{ scope.row.price }}
                      <!-- </div> -->
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="status"
                    label="订单状态"
                  />
                  <el-table-column align="center" label="操作">
                    <template #default="scope">
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)"
                        >Edit</el-button
                      >
                      <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除订单</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
      <el-footer style="position: absolute; bottom: 0">Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { subTime, subDateTime, remainTime } from "@/utils/time";
import { useRoute } from "vue-router";
import { getProducts, openProductDetail } from "@/api/product";
import Head from "@/components/head.vue";

const products = [
  {
    address: "枣庄",
    category: 1,
    createTime: "2022-06-22T09:10:47",
    description:
      "艺人：朴树、万能青年旅店、面孔乐队、夏日入侵企画、海龟先生、棱镜乐队、PeaceHotel和平饭店乐队、柳爽",
    goodsId: "2013",
    goodsName: "2022青鱼音乐节·枣庄",
    holdTime: "2022-12-20T09:10:47",
    marketTime: "2022-07-19T09:10:47",
    picture:
      "https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN01Ejto0F2GdSNrh3BJZ_!!2251059038.jpg",
    price: 490,
    starId: 2,
    status: 1,
    stock: 89,
    tip: "枣庄市民中心体育场",
    updateTime: "2022-06-22T09:10:47",
    count: 1,
    order_id: 1211,
  },
];
let total = ref(0);

const calTotal = (products) => {
  products.forEach((element) => {
    total.value += element.price;
  });
};
onMounted(() => {
  calTotal(products);
});
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
  overflow-x: hidden;
}
.card-text {
  padding: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.total-text {
  display: flex;
  background-color: #f7f7f7;
  width: 100%;
  height: 40px;
  /* align-items: right; */
  padding-top: 1%;
  padding-right: 1%;
  justify-content: right;
  font: bold 24px large;
}
</style>