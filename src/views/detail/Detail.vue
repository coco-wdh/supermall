<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-goods-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <detail-details-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <goods-list :goodsList="recommendList"></goods-list>
    </scroll>
  </div>
</template>

<script>
import { getDetail, Goods, Shop, getRecommend } from '@/network/detail'
import Scroll from '@/components/common/scroll/Scroll.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailDetailsInfo from './childComps/DetailDetailsInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import GoodsList from '@/components/content/goods/GoodsList.vue'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailCommentInfo,
    DetailDetailsInfo,
    GoodsList
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      commentInfo: {},
      detailInfo: {},
      recommendList: []
    }
  },
  created() {
    this.id = this.$route.params.id;
    getDetail(this.id).then(res => {
      const data = res.result;
      //轮播图
      this.topImages = data.itemInfo.topImages;
      //商品
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //店铺
      this.shop = new Shop(data.shopInfo);
      //评论
      this.commentInfo = data.rate.list[0];
      //详情图片
      this.detailInfo = data.detailInfo
    });
    //推荐
    getRecommend().then(res => {
      this.recommendList = res.data.list;
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  }
}
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

.content {
  overflow: hidden;
  height: calc(100% - 44px);
}
</style>
