<template>
  <div class="block" style="height: 100%">
    <el-carousel trigger="click">
      <el-carousel-item v-for="item in imgList" :key="item.name">
        <img
          :src="item.src"
          class="carousel_item"
          alt="图片丢失了"
          :title="item.title"
          @click="getHomeProducts"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
  <el-row :gutter="10" class="home_row">
    <el-col :span="8">
      <el-card shadow="hover">
        <div>
          <svg
            t="1649127426675"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6621"
            width="100"
            height="100"
          >
            <path
              d="M512.002047 7.9347c278.387848 0 504.060183 225.677451 504.060183 504.0653 0 278.383755-225.672335 504.0653-504.060183 504.0653-278.388872 0-504.0653-225.681545-504.0653-504.0653 0-278.387848 225.676428-504.0653 504.0653-504.0653z m-6.067171 678.823137c-33.355622 6.470352-61.151633 20.333054-64.171403 21.865963-52.187489 23.849127-52.614206 37.619731-84.6293 40.928073-24.207283 2.500955-41.806068-0.954743-52.306192-10.271927-18.474733-16.392309 0.812503-43.761602 3.837391-48.809562l13.209833-13.246672 33.593029 33.634984c4.722549 4.732782 11.957309 4.300947 16.675764-0.425694l208.707999-208.956662-83.826007-83.93243-208.702882 208.965871c-4.723572 4.727665-4.296854 12.824048 0.425695 17.551713l18.713163 18.735676-14.936148 16.565248-3.027957 4.038981c-0.671288 2.079354-28.733357 43.654155 1.857297 70.923164 12.094432 10.773346 29.407715 16.202998 51.600112 16.202998 5.122661 0 10.507287-0.289595 16.152856-0.867762 34.2592-3.520166 36.911604-17.904753 91.247009-42.750577l0.431834-0.215917c1.045817-0.536211 104.995099-53.375545 143.072247 2.758828l16.69316-11.355607c-20.254259-29.847736-56.433177-40.680433-104.6175-31.338689z m-25.900851-188.826222c-3.837391 3.8466-3.571331 10.354815 0.609889 14.541152l4.540401 4.547563c4.181221 4.182244 10.685342 4.45649 14.526825 0.611936l27.137003-27.172818c3.845577-3.850694 3.574401-10.359931-0.606819-14.545246l-4.540401-4.54347c-4.176104-4.185314-10.681249-4.45649-14.521709-0.610913l-27.145189 27.171796z m11.203134 11.447703c2.723012 2.731199 7.266483 2.607379 9.772554 0.096191l17.698046-17.721582c2.507095-2.506072 2.625798-7.050566-0.100284-9.781764l-2.960419-2.964512c-2.727106-2.727106-7.267506-2.607379-9.773578-0.096191l-17.698045 17.721582c-2.506072 2.506072-2.625798 7.055682 0.09619 9.781764l2.965536 2.964512z m15.431426-114.633601l99.128497 99.2472c33.717872 5.673198 69.381045-3.001351 97.168869-26.029788L532.666651 297.458144c-23.000807 27.82364-31.66103 63.524675-25.998066 97.287573z m204.808187-105.811696c-44.788999-44.839141-115.959803-47.156925-163.489212-6.967678l170.446657 170.653364c40.148315-47.578527 37.834624-118.837335-6.957445-163.685686z"
              fill="#337ecc"
              p-id="6622"
              data-spm-anchor-id="a313x.7781069.0.i10"
              class="selected"
            ></path>
          </svg>
        </div>
        演唱会
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <div>
          <svg
            t="1649127204543"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2839"
            width="100"
            height="100"
          >
            <path
              d="M616.448 840.192c-7.168 0.512-14.336-0.512-20.48-3.072L404.48 759.296 231.424 875.52c-16.896 11.264-39.936 9.216-54.272-5.12-9.216-9.216-13.824-21.504-12.8-34.304l13.824-206.336c0-2.048-0.512-4.096-2.56-5.12L16.384 495.104c-12.8-10.24-18.944-27.136-15.36-43.52 3.072-16.384 15.872-29.184 31.744-33.28L230.4 367.616c2.048-0.512 3.584-2.048 4.096-3.584l71.168-194.048c7.68-22.528 32.256-34.304 54.784-26.112 9.216 3.072 17.408 9.728 22.528 18.432L491.52 337.408c1.024 1.536 2.56 2.56 4.608 3.072l203.776 8.704c16.384 0.512 31.232 10.752 37.888 26.112 6.656 15.36 4.096 33.28-6.144 46.08l-130.56 158.72c-1.536 1.536-1.536 3.584-1.024 5.632l54.784 199.168c3.584 12.288 1.024 25.6-6.144 36.352-7.68 10.752-19.456 17.92-32.256 18.944z"
              fill="#3366FF"
              p-id="2840"
            ></path>
            <path
              d="M885.76 882.688c-8.192 0-15.872-3.072-22.016-8.704l-62.464-60.416-87.552 15.36c-1.024 0-4.608 0.512-5.632 0.512-10.752 0-20.48-5.12-26.624-14.336-5.632-8.704-6.144-19.968-1.024-29.184l40.448-75.776-41.984-74.752c-5.12-9.216-5.12-20.48 0.512-29.696 7.168-10.24 19.456-15.872 31.744-14.336l87.552 13.312 61.44-61.44c6.144-6.144 13.824-9.216 22.528-9.216 15.36-0.512 28.16 10.24 30.72 25.088l13.312 84.48 79.872 36.864c14.848 6.656 21.504 23.552 15.36 38.4-3.072 6.656-8.192 11.776-14.848 14.848l-78.848 38.4-12.288 84.48c-2.56 14.848-15.36 26.112-30.208 26.112z"
              fill="#AEC9FF"
              p-id="2841"
            ></path>
          </svg>
        </div>
        综艺
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <div>
          <svg
            t="1649127268644"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3829"
            width="100"
            height="100"
          >
            <path
              d="M714.752 936.448l-45.056-17.408 166.912-426.496c7.168-18.944-2.048-40.448-20.992-47.616-0.512-0.512-1.536-0.512-2.048-0.512l-291.84-95.232c-18.944-6.144-38.912 3.584-46.08 22.016l-145.408 384.512-68.608-26.112L465.92 189.44c6.656-18.432 26.624-27.648 45.568-22.016L947.712 302.08c19.456 6.144 30.208 26.624 24.576 46.08-0.512 1.024-0.512 1.536-1.024 2.56L748.032 921.6c-5.12 13.312-19.968 19.968-33.28 14.848z"
              fill="#3366FF"
              p-id="3830"
            ></path>
            <path
              d="M50.176 703.488c1.536 80.384 68.096 143.872 147.968 142.336 77.824-1.536 140.8-64.512 142.336-142.336 1.536-80.384-61.952-146.432-142.336-147.968-80.384-1.536-146.432 61.952-147.968 142.336v5.632zM468.992 865.792c0 80.384 65.024 145.408 145.408 144.896 80.384 0 145.408-65.024 144.896-145.408s-65.024-145.408-145.408-144.896c-79.872 0-144.896 65.024-144.896 145.408z"
              fill="#3366FF"
              p-id="3831"
            ></path>
            <path
              d="M201.216 390.656L84.48 97.792c-7.168-17.92 1.536-38.4 19.456-45.568 1.024-0.512 2.048-0.512 2.56-1.024l121.344-36.864c15.872-5.12 33.28 2.56 40.448 17.92l14.848 32.256c7.68 16.896 0.512 36.864-16.384 44.544-1.024 0.512-2.56 1.024-3.584 1.536L180.224 138.24c-7.68 2.56-11.264 10.24-9.216 17.92 0 0.512 0 0.512 0.512 1.024L250.368 358.4c2.56 6.144-0.512 12.8-6.144 15.36l-43.008 16.896z"
              fill="#AEC9FF"
              p-id="3832"
            ></path>
            <path
              d="M67.072 390.656c0 52.736 42.496 95.232 95.232 95.232s95.232-42.496 95.232-95.232S215.04 295.424 162.304 295.424 67.072 337.92 67.072 390.656z"
              fill="#AEC9FF"
              p-id="3833"
            ></path>
          </svg>
        </div>
        音乐剧
      </el-card>
    </el-col>
  </el-row>
  <el-row class="home_row" v-for="o in categoryList" :key="o.name">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font: 26px bold">{{ o.name }}</span>
          <el-button class="button" type="text">查看全部</el-button>
        </div>
      </template>
      <el-row>
        <el-col
          v-for="(p, index) in homeProductsList[o.id]"
          :key="p"
          :span="6"
          :offset="index > 0 ? 2 : 1"
        >
          <el-card
            :body-style="{ padding: '0px' }"
            shadow="hover"
            @click="openProductDetail(p.goodsId, o.name)"
          >
            <img :src="p.picture" class="carousel_item" />
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
    </el-card>
  </el-row>
</template>
<script>
</script>
<script setup>
import { onMounted, ref } from "vue";
import { getProducts, openProductDetail } from "@/api/product";
import { getSnapProducts } from "@/api/snap";
import { subDateTime } from "@/utils/time";
import { useRouter } from "vue-router";

const router = useRouter();

const imgList = [
  {
    name: "lj",
    src: "https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/1.jpeg",
    title: "这是lj.png",
  },
  {
    name: "logo",
    src: "https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/2.jpeg",
    title: "这是logo.png",
  },
  {
    name: "bg",
    src: "https://focussnip.oss-cn-hangzhou.aliyuncs.com/files/3.jpeg",
    title: "这是bg.png",
  },
];
const categoryList = [
  {
    name: "限时秒杀",
    id: 0,
  },
  {
    name: "演唱会",
    id: 1,
  },
  {
    name: "综艺",
    id: 2,
  },
  {
    name: "音乐剧",
    id: 3,
  },
];
const homeProductsList = ref([]);

const getHomeProducts = async () => {
  const categoryList = [1, 2, 3];
  for (let index = 0; index < categoryList.length; index++) {
    const data = {
      pageNum: 4,
      pageSize: 3,
      category: categoryList[index],
    };
    const products = await getProducts(data);
    // console.log(products.records);
    homeProductsList.value.push(products.records);
  }
};
const getHomeSnapProducts = async () => {
  const products = await getSnapProducts();
  products.forEach((element) => {
    element.goodsId = element.id;
  });
  // console.log(products);
  homeProductsList.value.push(products.slice(0, 3));
};

// defineExpose({
//   subTime,
//   getHomeProducts,
// });

onMounted(async () => {
  await getHomeSnapProducts();
  await getHomeProducts();
});
</script>

<style scoped>
.home_row {
  margin: 20px 0;
}
.carousel_item {
  height: 100%;
  width: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  width: 100%;
}
.card-text {
  padding: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>