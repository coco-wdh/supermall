<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import HomeSwiper from './homeComps/HomeSwiper.vue'
import RecommendView from './homeComps/RecommendView.vue'
import FeatureView from './homeComps/FeatureView.vue'

import { getHomeMultidata, getHomeGoods } from "network/home"

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted(){
    this.$bus.$on('itemImageLoad',()=>{
      this.$refs.scroll.refresh();
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /* 事件监听 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y)>1000;
    },
    loadMore(){
      this.getHomeGoods(this.currentType);
    },
    /* 网络请求 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      }).catch(err => console.log(err))
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1
        // 上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
}

.tab-control {
  position: sticky;
  top: 44px;
}
</style>
