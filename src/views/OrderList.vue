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
                <el-table :data="orders" stripe style="width: 100%">
                  <el-table-column
                    align="center"
                    label="订单号"
                    prop="orderId"
                  />
                  <el-table-column
                    align="center"
                    label="订单商品信息"
                    width="280"
                    prop="description"
                  >
                  </el-table-column>
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
                  >
                    <template #default="scope">
                      <span v-if="scope.row.status == 1" style="color: #039e2a"
                        >已付款</span
                      >
                      <span
                        v-else-if="scope.row.status == 0"
                        style="color: #db3a36"
                        >待付款</span
                      >
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                    <template #default="scope">
                      <el-button
                        size="small"
                        @click="handlePay(scope.row.orderId, scope.row.price)"
                        >付款</el-button
                      >
                      <el-button
                        size="small"
                        type="danger"
                        @click="
                          handleDelete(scope.row.orderId)
                        "
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
      <!-- <el-footer style="position: absolute; bottom: 0">Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance, computed, inject } from "vue";
import { subTime, subDateTime, remainTime } from "@/utils/time";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { getProducts, openProductDetail } from "@/api/product";
import Head from "@/components/head.vue";
import { getOrder, deleteOrder } from "@/api/order";

const reload = inject("reload");
const router = useRouter();
// const products = [
//   {
//     orderId: "1",
//     price: 123.0,
//     description: "张杰演唱会",
//     createdTime: "2022-04-09T23:21:37",
//     payedTime: "2022-04-10T10:55:56",
//     status: 0,
//     userId: 34,
//   },
// ];
const orders = ref([]);

let total = ref(0);

const getOrders = async () => {
  const orderList = await getOrder();
  orders.value = orderList.records;
};

const handlePay = (orderId, price) => {
  router.push({
    name: "orderPay",
    query: { orderId: orderId },
    params: { total: price },
  });
};

const handleDelete = async (orderId) => {
  const data = await deleteOrder(orderId);
  if (data == undefined) {
    ElMessage.success("删除订单成功");
    // getOrders();
    reload();
  }
};

onMounted(() => {
  getOrders();
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