<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartListLength }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar class="bottom-bar"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import Scroll from '@/components/common/scroll/Scroll.vue';

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue';

import { mapGetters } from 'vuex';
export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(['cartListLength'])
  },
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
#cart{
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content{
  overflow: hidden;
  height: calc(100% - 44px - 49px - 45px);
  padding: 6px;
}
.bottom-bar{
  position: relative;
}
</style>
