<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>

import NavBar from '@/components/common/navbar/NavBar.vue'

import HomeSwiper from './homeComps/HomeSwiper.vue'
import RecommendView from './homeComps/RecommendView.vue'
import FeatureView from './homeComps/FeatureView.vue'

import { getHomeMultidata } from "@/network/home"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
