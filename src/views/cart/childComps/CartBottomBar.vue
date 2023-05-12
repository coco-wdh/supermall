<template>
  <div class="cart-bottom">
    <check-button class="select-all" :checked="!isSelectAll" @click.native="selectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="settlement">结算({{cartListLength}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue';
import { mapGetters } from 'vuex';
import { CHECKED_ALL } from '@/store/mutation_type'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList','cartListLength']),
    totalPrice(){
      return this.cartList.filter(item=>item.checked==true)
      .reduce((sum,current)=>sum+current.price*current.count,+0).toFixed(2)
    },
    isSelectAll(){
      //true为非全选
      if(this.cartListLength==0)
        return true;
      return this.cartList.some(item=>item.checked==false)
    }
  },
  methods: {
    selectAll(){
      if(this.isSelectAll){
        this.$store.commit(CHECKED_ALL,true)
      }else{
        this.$store.commit(CHECKED_ALL,false)
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom {
  height: 45px;
  background-color: #eee;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
  font-size: 14px;
  color: #888;
  padding-left: 6px;
}

.select-all {
  display: inline-block;
  margin-right: 3px;
  position: relative;
  top: 3px;
}

.cart-bottom span {
  line-height: 45px;
}

.total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.settlement {
  background-color: orangered;
  float: right;
  width: 90px;
  color: #fff;
  text-align: center;
}</style>
