<template>
  <div class="goods">
    <good-list-item v-for="item in goodsList" :goods-item="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodsListItem.vue'

  export default {
    name: "GoodList",
    components:{
      GoodListItem
    },
    props:{
      goodsList:{
        type:Array,
        dafault(){
          return [];
        }
      }
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3%;
}
</style>