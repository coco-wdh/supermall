<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price | showPrice }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showPrice(price) {
      return '￥' + (+price).toFixed(2);
    }
  }
}
</script>

<style scoped>
.goods-item {
  width: 46%;
  position: relative;
  padding-bottom: 38px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}</style>