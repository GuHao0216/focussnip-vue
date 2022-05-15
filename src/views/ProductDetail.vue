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
                    >首页</el-breadcrumb-item
                  >
                  <el-breadcrumb-item
                    ><a href="/"
                      >{{ categoryList[category - 1] }}
                    </a></el-breadcrumb-item
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
                      <h3>举办时间：{{ product.holdTime }}</h3>
                      <h4>地点：{{ product.tip }}</h4>
                      <h4>价格：{{ product.price }}</h4>
                      <h5>库存：{{ product.stock }}</h5>
                      <el-button :type="buyType" size="large">{{
                        buyText
                      }}</el-button>
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
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { onMounted, ref, getCurrentInstance, computed } from "vue";
import { subTime, subDateTime, remainTime } from "@/utils/time";
import { useRoute } from "vue-router";
import { getProducts, openProductDetail } from "@/api/product";
import Head from "@/components/head.vue";
import HomeMain from "@/components/main/HomeMain.vue";

// TODO：优化外部加载已有方法
const route = useRoute();
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

const activeName = ref("first");
const product = ref({});
const category = ref({});
const categoryList = ["演唱会", "综艺", "音乐剧"];
const remainMarketTime = ref({});

const buyText = computed(() => {
  if (product.value.stock != 0) {
    return "立即抢购";
  }
  return "已售罄";
});
const buyType = computed(() => {
  if (product.value.stock != 0 && remainMarketTime.value == undefined) {
    return "primary";
  }
  return "info";
});
const homeProductsList = ref([]);

const getRecommendListProducts = async (category) => {
  const data = {
    pageNum: Math.round(Math.random() * 10),
    pageSize: 3,
    category: category,
  };
  const recommendProducts = await getProducts(data);
  homeProductsList.value.push(recommendProducts.records);
};
const getProductDetail = async (id) => {
  const data = {
    goodsId: id,
  };
  const products = await getProducts(data);
  product.value = products.records[0];
  product.value.marketTime = subTime(product.value.marketTime);
  product.value.holdTime = subTime(product.value.holdTime);
  category.value = product.value.category;
  remainMarketTime.value = remainTime(product.value.marketTime);
  product.value.detail =
    '<!DOCTYPE html><html><head></head><body><p><strong>2022 BY2“不再懦弱”全国巡演 青春起航</strong></p><p>你的青春我的青春似乎都一样<br>你的青春我的青春谁没过疯狂<br>那些年听MP3的日子<br>那曾青春懵懂青涩爱恋的时刻<br>那种感觉，那个人，你是否还记得？<br>不想遗忘或者试图回味<br>不妨来听一场BY2的演唱会<br>她们，回来了<br>很多年过去，BY2不再懵懂，褪去青涩，步入而立，从歌手蜕变为原创音乐人。其间经历过各种风雨，尝遍人生百味。也曾有怯懦，也曾有过退缩。但为了心中里的梦想，她们决定放手一搏，BY2“不再懦弱”全国巡演。为梦想而战，为梦想而歌。<br><img src="https://img.alicdn.com/imgextra/i1/2251059038/O1CN01PrXNZk2GdSORKxUnG_!!2251059038.png" width="864" height="1206" damai_width="864" damai_height="1206"><br>用音乐描绘初恋的画卷<br>用歌声召唤当初那个他<br>这个青春不再的年纪<br>重回青春的感觉<br>重尝初恋的味道<br>BY2决定撕下过去的标签<br>三百六十度改变，重新出发<br>沉淀多年回归，再唱曾经的歌曲<br>回忆青春的或许也包括她们<br>在2022年，各大城市的巡回演出中<br>与BY2一起，回忆青春<br>品尝初恋，展望未来<br>见证属于BY2的声乐魅力<br><img src="https://img.alicdn.com/imgextra/i1/2251059038/O1CN015A0Xxu2GdSOS9MPGM_!!2251059038.png" width="864" height="1178" damai_width="864" damai_height="1178"><br>BY2是90后的回忆，她们用甜美的嗓音唱着初恋的酸甜苦辣，那时几乎每个MP3里面都有几首BY2的歌。用声音描述青涩爱情的BY2，听她们用嗓音娓娓道来有一种很享受的感觉。一曲曲风明快，旋律讨喜的《爱丫爱丫》，表达出年轻人对爱的渴望和执着。甜的出蜜的《有点甜》，表现了对爱情的向往，让人们改变了对快歌不能展现甜蜜的偏见。这两首歌百万级的收藏，不时被重新翻唱。<br><img src="https://img.alicdn.com/imgextra/i4/2251059038/O1CN01LrpGzb2GdSOHvui1n_!!2251059038.png" width="864" height="1297" damai_width="864" damai_height="1297"><br>沉淀多年的BY2，2019年凭借《明日之子》成功复出，用一次又一次的舞台展现他们的业务能力。粉丝们发现，即使BY2已是褪去青涩的年纪，仍保持着姣好身材，唱跳功力不输当年，在舞台上对各种突发情况亦是应对自如，展现出他们担任制作人的原创歌曲的实力，圈粉无数，不知道又会成为谁的青春。<br><img src="https://img.alicdn.com/imgextra/i3/2251059038/O1CN01je3XD02GdSOTBkQ5c_!!2251059038.png" width="864" height="1297" damai_width="864" damai_height="1297"><br>青春已逝，当初的人是否还在<br>BY2在，BY2式情歌就还在<br>那些模糊的或是已经遗忘的<br>就让歌曲带你们追溯时光<br>草在等它的雨水<br>风在追它的云<br>BY2和青春在等你<br>2022，不负相遇<br><img src="https://img.alicdn.com/imgextra/i1/2251059038/O1CN01H8OVNv2GdSORKzdzH_!!2251059038.png" width="864" height="1297" damai_width="864" damai_height="1297"></p></body></html>';
  // document.getElementById("detail").innerHTML = product.value.detail;
  // document.getElementById("detail").style = "width:100%";
  //update time
  setInterval(function () {
    remainMarketTime.value = remainTime(product.value.marketTime);
  }, 1000);
};

onMounted(async () => {
  if (route.query.id == undefined) {
    //TODO: 跳转404
    console.log(123);
  } else {
    await getProductDetail(route.query.id);
    document.title = product.value.goodsName + "-focussnip";
    await getRecommendListProducts(category.value);
  }
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
.nav{
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