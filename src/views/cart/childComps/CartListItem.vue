<template>
  <div id="cart-item">
    <check-button :checked="cartItem.checked" @click.native="checkBtnClick"></check-button>
    <div class="item-img">
      <img :src="cartItem.imgURL" alt=" ">
    </div>
    <div class="item-info">
      <div class="item-title">{{ cartItem.title }}</div>
      <div class="item-desc">{{ cartItem.desc }}</div>
      <div>
        <div class="item-price left">¥{{ cartItem.price }}</div>
        <div class="item-count right">x{{ cartItem.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CHANGE_CHECKED } from '@/store/mutation_type'
import CheckButton from './CheckButton.vue'
export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    cartItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkBtnClick(){
      this.$store.commit(CHANGE_CHECKED,this.cartItem);
    }
  }
}
</script>

<style scoped>
#cart-item {
  display: flex;
  align-items: center;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 75px;
  height: 105px;
  border-radius: 5px;
}

.item-info {
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 17px;
  color: #333;
  overflow: hidden;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-desc {
  font-size: 14px;
  color: #666;
}

.item-price {
  color: orangered;
}</style>
