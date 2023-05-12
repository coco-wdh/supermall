<template>
    <div class="icon-selector" :class="{'selector-active': checked}">
      <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.icon-selector {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #fff;
  border: 2px solid #ccc;
  cursor: pointer;
}

.selector-active {
  background-color: #ff8198;
  border-color: #ff8198;
} 
</style>
