<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-goods-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <detail-details-info :detail-info="detailInfo" ref="detailInfo" @imageLoad="imageLoad" />
      <goods-list :goodsList="recommendList" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  </div>
</template>

<script>
import { getDetail, Goods, Shop, getRecommend } from '@/network/detail'
import Scroll from '@/components/common/scroll/Scroll.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailDetailsInfo from './childComps/DetailDetailsInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottombar.vue'

import { itemListenerMixin, backTopMixin } from '@/common/mixin'
import { mapActions } from 'vuex'

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
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      commentInfo: {},
      detailInfo: {},
      recommendList: [],
      titleTopYs: [],
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      this.commentInfo = data.rate.cRate==0?{}:data.rate.list[0];
      //详情图片
      this.detailInfo = data.detailInfo
    });
    //推荐
    getRecommend().then(res => {
      this.recommendList = res.data.list;
    })
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    ...mapActions({
      add: 'addCart'
    }),
    imageLoad() {
      this.$refs.scroll.refresh();
      //获取offsetTop
      this.titleTopYs.push(0);
      this.titleTopYs.push(this.$refs.comment.$el.offsetTop);
      this.titleTopYs.push(this.$refs.detailInfo.$el.offsetTop);
      this.titleTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.titleTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.titleTopYs[index] + 44, 500);
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000;
      let posY = -position.y + 44;
      for (let i = 0; i < this.titleTopYs.length - 1; i++) {
        if (posY >= this.titleTopYs[i] && posY < this.titleTopYs[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break;
        }
      }
    },
    addCart() {
      const product = {};
      product.id = this.id;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      this.add(product).then(res=>{
        this.$toast.show(res);
      });
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
  height: calc(100% - 44px - 49px);
}
</style>
