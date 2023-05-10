<template>
  <nav-bar>
    <div slot="left" class="back" @click="goBack">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" :class="{ active: currentIndex == index }" @click="itemClick(index)">{{ item
      }}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  props: {
    titles: {
      type: Array,
      default() {
        return ['商品', '评论', '详情', '推荐']
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    goBack() {
      // history.go(-1);
      this.$router.back()
    },
    itemClick(index) {
      this.$emit('titleClick', index);
    }
  }
}
</script>

<style scoped>
.back img {
  margin-top: 11px;
}

.title {
  display: flex;
  justify-content: space-around;
}

.active {
  color: var(--color-high-text);
}
</style>
