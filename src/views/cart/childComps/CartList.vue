<template>
  <div>
    <cart-list-item v-for="item in cartList" :cart-item="item"></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartListItem from './CartListItem.vue'
export default {
  name: "CartList",
  components: {
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped></style>
