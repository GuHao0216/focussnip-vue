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
                :active="2"
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
              <h2>支付方式</h2>
              <br />
              <br />
            </el-row>
            <el-row>
              <el-col :span="6">
                <div>
                  <img
                    style="width: 100%"
                    src="https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/wechatpay.png"
                  />
                </div>
              </el-col>
              <el-col :span="6" :offset="2">
                <div
                  style="
                    padding-top: 10px;
                    border: solid 2px #409eff;
                    border-radius: 20px;
                  "
                >
                  <img
                    style="width: 90%"
                    src="https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/alipay.png"
                  />
                </div>
                <VueQr
                  :logoSrc="imageUrl"
                  :text="payQC"
                  :size="200"
                ></VueQr>
                <!-- <VueQr :logoSrc="imageUrl" :logoMargin="3"  text="https://qr.alipay.com/bax07976rlaawhesaenl003d" :size="200"></VueQr> -->
              </el-col>
            </el-row>
            <br />
            <br />
            <div class="total-text">
              实付款：
              <span style="color: red">￥{{ total }}</span>
            </div>
            <div style="width: 100%">
              <el-button
                style="float: right; width: 200px"
                type="primary"
                size="large"
                @click="pay"
                >已完成付款</el-button
              >
            </div>
          </el-col>
        </el-row></el-main
      >
      <el-footer style="position: absolute; bottom: 0">Footer</el-footer>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { subTime, subDateTime, remainTime } from "@/utils/time";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { payOrder, checkAlipayStatus, alipay } from "@/api/order";
import VueQr from "vue-qr/src/packages/vue-qr.vue";
import Head from "@/components/head.vue";

const route = useRoute();
const router = useRouter();

const imageUrl = require("../../public/alipaylogo.png");
// const imageUrl= require("../assets/logo.png")
// const imageUrl= "https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/alipay.png"

const total = ref(0);
const orderId = ref(0);
const payQC = ref("");

const pay = async () => {
  const flag = await checkAlipayStatus(orderId.value);
  console.log(flag)
  if (flag == "WAIT_BUYER_PAY") {
    ElMessage.warning("等待用户付款");
  }
  if (flag == "TRADE_SUCCESS") {
    const data = await payOrder(orderId.value);
    if (data != "") {
      ElMessage.success("支付成功");
      router.push({ path: "/" });
    } else {
      ElMessage.error("支付失败");
    }
  }
  else{
    ElMessage.warning("未完成付款");
  }
};
onMounted(async () => {
  orderId.value = route.query.orderId;
  total.value = route.params.total;
  payQC.value = await alipay(orderId.value);
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
  /* padding-right: 1%; */
  justify-content: right;
  font: bold 24px large;
}
</style>