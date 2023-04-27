<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :images="topImages"></detail-swiper>
  </div>
</template>

<script>
import { getDetail } from 'network/detail';

import DetailSwiper from './childComps/DetailSwiper'
import DetailNavBar from './childComps/DetailNavBar'

export default {
  name: "Detail",
  components:{
    DetailSwiper,
    DetailNavBar
  },
  data() {
    return {
      id: null,
      topImages: []
    }
  },
  created() {
    this.id = this.$route.params.id;
    getDetail(this.id).then(res => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
    });
  },
}
</script>

<style scoped></style>