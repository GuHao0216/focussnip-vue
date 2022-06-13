import axios from '@/utils/axios-util'
import Vrouter from "@/router"

export const getProducts = (data) => {
  return axios.request({
    url: 'goods/query',
    data,
    method: 'post'
  })
}

export const openProductDetail = (productId,name) => {
  if (name == '限时秒杀'){
    let routeData = Vrouter.resolve({
      path: "/snapproductdetail",
      query:{
        productId: productId
      },
    });
    window.open(routeData.href, "_blank");
  }
  else{
  let routeData = Vrouter.resolve({
    path: "/productdetail",
    query:{
      productId: productId
    },
  });
  window.open(routeData.href, "_blank");}
};


