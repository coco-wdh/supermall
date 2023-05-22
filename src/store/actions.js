import * as types from './mutation_type'
export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = this.state.cartList.find(item => item.id == payload.id);
      if (oldProduct) {
        context.commit(types.ADD_COUNT, oldProduct);
        resolve('商品数量加一');
      } else {
        payload.count = 1;
        payload.checked = true;
        context.commit(types.ADD_TO_CART, payload);
        resolve('商品已加入购物车');
      }
    })
  }
}
