<template>
  <div class="home">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="18" :offset="3">
            <el-row>
              <el-steps
                align-center
                :active="1"
                finish-status="success"
                style="width: 100%; padding-top: 3%"
              >
                <el-step title="选择商品" />
                <el-step title="确认订单信息" />
                <el-step title="支付订单" />
              </el-steps>
            </el-row>
            <br />
            <br />
            <br />
            <el-row>
              <el-table :data="products" stripe style="width: 100%">
                <el-table-column align="center" label="商品信息" width="280">
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
                <el-table-column align="center" prop="price" label="单价" />
                <el-table-column align="center" prop="count" label="数量" />
                <el-table-column align="center" label="小计">
                  <template #default="scope">
                    <div style="font: bold 18px large">
                      {{ scope.row.price }}
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="total-text">
                实付款：
                <span style="color: red">￥{{ total }}</span>
              </div>
              <div style="width: 100%">
                <el-button
                  style="float: right; width: 200px"
                  type="primary"
                  size="large"
                  @click="payOrder()"
                  >提交订单</el-button
                >
              </div>
            </el-row>
          </el-col>
        </el-row></el-main
      >
      <!-- <el-footer style="position: absolute; bottom: 0">Footer</el-footer> -->
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { subTime, subDateTime, remainTime } from "@/utils/time";
import { useRoute, useRouter } from "vue-router";
import { getProducts, openProductDetail } from "@/api/product";
import Head from "@/components/head.vue";

const route = useRoute();
const router = useRouter();

const products = ref([]);
const total = ref(0);
const orderId = ref(0);

const calTotal = (p) => {
  p.forEach((element) => {
    total.value += element.price;
  });
};

const payOrder = () => {
  const payTotal = total.value
  const payOrderId = orderId.value
  router.push({
    name: "orderPay",
    query: { orderId: payOrderId },
    params: { total: payTotal },
  });
};

onMounted(() => {
  orderId.value = route.query.orderId;
  products.value.push(JSON.parse(route.params.product));
  calTotal(products.value);
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