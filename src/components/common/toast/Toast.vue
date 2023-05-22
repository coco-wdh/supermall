<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(msg, time = 2000) {
      this.isShow = true;
      this.message = msg;
      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      },time);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 8px 6px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  color: #fff;
  z-index: 9;
}
</style>
