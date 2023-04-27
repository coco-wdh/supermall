<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-goods-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-details-info :detail-info="detailInfo" @imageLoad="imageLoad" />
    </scroll>
  </div>
</template>

<script>
import { getDetail, Goods, Shop, GoodsParam } from '@/network/detail'
import Scroll from '@/components/common/scroll/Scroll.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailDetailsInfo from './childComps/DetailDetailsInfo.vue'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailDetailsInfo
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    }
  },
  created() {
    this.id = this.$route.params.id;
    getDetail(this.id).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      console.log(this.detailInfo);
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    });
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