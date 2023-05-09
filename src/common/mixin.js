import { debounce } from '@/common/utils'

export const itemListenerMixin = {
  data(){
    return {
      itemImageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImageListener = ()=>{
      refresh();
    }
    this.$bus.$on('itemImageLoad', this.itemImageListener)
  },
}