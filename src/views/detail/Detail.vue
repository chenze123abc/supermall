<template>
  <div id="detail">
    <detail-nav-bar
    @titleClick="titleClick"
    class="detail-nav" 
    ref="nav"
    >
    </detail-nav-bar>
    <scroll class="contents" 
    ref="scroll"
    :probe-type="3"
    @scroll="contentScroll" >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment :comment-info="commentInfo" ref="comment"></detail-comment>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailComment from "./childComps/DetailComment"
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList"
import BackTop from "components/content/backTop/BackTop"
// import Toast from "components/common/toast/Toast"

import { getDetail, Goods, Shop, GoodsParam ,getRecommend} from "network/detail";

import { mapActions } from "vuex"
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailComment,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo:{},
      recommend:[],
      themeTopYs:[],
      currentIndex:0,
      isShowBackTop:false,
      // message:'',
      // show:false
    };
  },

  created() {
    //保存传进的iid
    this.iid = this.$route.params.iid;
    //根据传进的iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //获取商品详情页轮播图
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息对象
      this.shop = new Shop(data.shopInfo);
      //保存商品信息
      this.detailInfo = data.detailInfo;
      //获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //取出评论信息
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    });
    //请求推荐数据
    getRecommend().then((res)=>{
      this.recommend=res.data.list
    })
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
    this.$refs.scroll.refresh();
    this.$nextTick(()=>{
    this.themeTopYs=[]
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
    })
    },
    titleClick(key){
    this.$refs.scroll.scrollTo(0,-this.themeTopYs[key],100)
  },
   contentScroll(position){
    const positionY=-position.y
    let length=this.themeTopYs.length
    for(let i=0;i<length;i++){
      if(this.currentIndex!==i&&(i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
      ||
      (i===length-1&&positionY>=this.themeTopYs[i]))
      this.currentIndex=i;
      // console.log(this.currentIndex);
      this.$refs.nav.currentIndex=this.currentIndex
    }
  },
   backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product={}
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.iid=this.iid;
      //将商品添加到购物车里
      // this.$store.dispatch('addCart',product).then((res)=>{
      //   console.log(res);
      // })
      this.addCart(product).then((res)=>{
        this.show=true;
        this.message=res;
        console.log(res);
        // setTimeout(()=>{
        //   this.show=false;
        //   this.message=''
        // },1000)
        this.$toast.show(res,1500)
      })
    }
  },

};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.contents {
  height: calc(100% - 44px - 49px);
}
</style>