<template>
  <div class="home">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <el-row>
        <el-col :span="18" :offset="3">
          <el-main>
            <el-row>
              <el-row style="padding: 2% 0">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/' }"
                    ><a href="/">首页</a></el-breadcrumb-item
                  >
                  <el-breadcrumb-item
                    ><a href="/">限时秒杀 </a></el-breadcrumb-item
                  >
                  <el-breadcrumb-item>{{
                    product.goodsName
                  }}</el-breadcrumb-item>
                </el-breadcrumb>
              </el-row>
              <el-col :span="17">
                <el-card :body-style="{ padding: '20px' }" shadow="never">
                  <el-row>
                    <el-col :span="10">
                      <img
                        :src="product.picture"
                        style="width: 100%"
                        class="image"
                      />
                    </el-col>
                    <el-col :span="12" :offset="2" style="text-align: left">
                      <h1 style="margin-top: 0">{{ product.goodsName }}</h1>
                      <h3 style="color: red">
                        抢购时间：{{ product.marketTime }}
                      </h3>
                      <h3>结束时间：{{ product.endTime }}</h3>
                      <h4>举办时间：{{ product.holdTime }}</h4>
                      <h4>地点：{{ product.tip }}</h4>
                      <h4>价格：{{ product.price }}</h4>
                      <h5>库存：{{ product.stock }}</h5>
                      <el-button
                        :type="buyType"
                        @click="confirmOrder(buyType, buyText)"
                        size="large"
                        >{{ buyText }}</el-button
                      >
                      <span style="font-size: small">{{
                        remainMarketTime
                      }}</span>
                    </el-col>
                  </el-row>
                  <!-- <el-affix :offset="0"> -->
                  <!-- <div class="nav" > -->
                  <!-- <span style="text-align:left">详情</span> -->
                  <!-- <el-tabs v-model="activeName" type="card" class="demo-tabs">
                      <el-tab-pane label="User" name="first"></el-tab-pane>
                    </el-tabs> -->

                  <el-divider content-position="left">详情</el-divider>
                  <!-- </div>
                    </el-affix> -->
                  <div id="detail" v-html="product.detail"></div>
                </el-card>
              </el-col>
              <el-col :span="6" :offset="1">
                <h2>为您推荐</h2>
                <el-card
                  v-for="p in homeProductsList[0]"
                  :key="p"
                  :body-style="{ padding: '0px' }"
                  shadow="hover"
                  @click="openProductDetail(p.goodsId)"
                >
                  <img
                    :src="p.picture"
                    style="width: 100%"
                    class="carousel_item"
                  />
                  <div class="card-text" :title="p.goodsName">
                    <span>{{ p.goodsName }}</span>
                    <div class="card-text">
                      <span>{{ subDateTime(p.marketTime) }}&nbsp;</span>
                      <span>{{ p.tip }}</span>
                    </div>
                    <div class="bottom" style="font-size: 23px; color: #409eff">
                      <!-- <time class="time">{{ currentDate }}</time> -->
                      ¥{{ p.price }}
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-backtop :right="100" :bottom="100" />
          </el-main>
        </el-col>
      </el-row>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script setup>
// @ is an alias to /src
import {
  onMounted,
  ref,
  getCurrentInstance,
  computed,
  onBeforeUnmount,
} from "vue";
import { subTime, subDateTime, remainTime, remainSnapTime } from "@/utils/time";
import { useRoute, useRouter } from "vue-router";
import { getProducts, openProductDetail } from "@/api/product";
import {
  getSnapProductDetail,
  buySnapItem,
  joinSnap,
  checkSnap
} from "@/api/snap";
import { createOrder } from "@/api/order";
import { ElMessage, ElLoading } from "element-plus";
import { getToken } from "@/utils/util";
import Head from "@/components/head.vue";

// TODO：优化外部加载已有方法
const route = useRoute();
const router = useRouter();
// const product = {
//   address: "枣庄",
//   category: 1,
//   createTime: "2022-06-22T09:10:47",
//   description:
//     "艺人：朴树、万能青年旅店、面孔乐队、夏日入侵企画、海龟先生、棱镜乐队、PeaceHotel和平饭店乐队、柳爽",
//   goodsId: "2013",
//   goodsName: "2022青鱼音乐节·枣庄",
//   holdTime: "2022-12-20T09:10:47",
//   marketTime: "2022-07-19T09:10:47",
//   picture:
//     "https://img.alicdn.com/bao/uploaded/https://img.alicdn.com/imgextra/i2/2251059038/O1CN01Ejto0F2GdSNrh3BJZ_!!2251059038.jpg",
//   price: 490,
//   starId: 2,
//   status: 1,
//   stock: 89,
//   tip: "枣庄市民中心体育场",
//   updateTime: "2022-06-22T09:10:47",
// };
let timer = null;
const activeName = ref("first");
const product = ref({});
const category = ref({});
const categoryList = ["演唱会", "综艺", "音乐剧", "限时秒杀"];
const remainMarketTime = ref({});
const options = {
  text: "正在全力排队中...",
};
const snapId = ref(0);
const orderId = ref(0);

const buyText = computed(() => {
  if (getToken() != "") {
    if (product.value.stock != 0) {
      return "立即抢购";
    }
    return "已售罄";
  }
  return "登录后参与抢购";
});
const buyType = computed(() => {
  if (product.value.stock != 0 && remainMarketTime.value != " ") {
    return "primary";
  }
  return "info";
});
const homeProductsList = ref([]);

const getRecommendListProducts = async (category) => {
  const data = {
    pageNum: Math.round(Math.random() * 3),
    pageSize: 3,
    category: category,
  };
  const recommendProducts = await getProducts(data);
  homeProductsList.value.push(recommendProducts.records);
};
const getProductDetail = async (id) => {
  const products = await getSnapProductDetail(id);
  product.value = products;
  //   product.value.marketTime = subTime(product.value.marketTime);
  //   product.value.holdTime = subTime(product.value.holdTime);
  category.value = product.value.category;
  remainMarketTime.value = remainSnapTime(product.value.endTime);
  //   console.log(product);
  //update time
  timer = setInterval(function () {
    remainMarketTime.value = remainSnapTime(product.value.endTime);
  }, 1000);
};

const confirmOrder = async (btype, btext) => {
  if (getToken() === "") {
    router.push({ path: "/login" });
  }
   else if (product.value.stock != 0 && remainMarketTime.value != " ") {
    // const data = {
    //   goodId: product.value.goodsId
    // }
    // 获取抢购资格
    const loadingInstance = ElLoading.service(options);
    const joinFlag = await joinSnap();
    const buyFlag = await buySnapItem(product.value.id);
    if (joinFlag == "成功参与抢购" && buyFlag == "成功参与抢购") {
      //   const checkflag = await checkSnap();

      const snapTimer = setInterval(() => {
        setTimeout(async () => {
          // chooseProduct 自己封装的axios请求
          const checkflag = await checkSnap();
          console.log(checkflag);
          //视情况而定
          if (checkflag != false) {
            // 这里可以写一些中止轮询的条件
            clearInterval(snapTimer);
            // snapTimer = null;
            loadingInstance.close();
            //TODO:默认数量为1
            orderId.value = checkflag.id;
            snapId.value = checkflag.snapId;
            product.value.count = 1;
            router.push({
              name: "orderConfirm",
              query: { orderId: orderId.value },
              params: {
                product: JSON.stringify(product.value),
                snap: true,
                snapId: snapId.value,
              },
            });
          }
        }, 0);
      }, 2000);
      //购买特定抢购商品
    } else {
      ElMessage.error("参与抢购失败,请重试");
    }
    // console.log(joinFlag);
  }
};

onMounted(async () => {
  if (route.query.productId == undefined) {
    //TODO: 跳转404
    console.log(123);
  } else {
    await getProductDetail(route.query.productId);
    document.title = product.value.goodsName + "-focussnip";
    await getRecommendListProducts(category.value);
  }
});

onBeforeUnmount(() => {
  clearInterval(timer);
//   clearInterval(snapTimer);
  timer = null;
//   snapTimer = null;
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
#detail {
  /* width: 200px !important; */
  /* overflow: hidden; */
  font-size: 16px;
  color: #4a4a4a;
  line-height: 30px;
}
.nav {
  background: white;
  border: solid #4a4a4a 1px;
}
</style>
<style>
.el-divider__text.is-left {
  font-size: large;
}
#detail img {
  max-width: 100%;
}
</style>