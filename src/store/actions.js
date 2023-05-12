import * as types from './mutation_type'
export default {
  addCart(context, payload) {
    let oldProduct = this.state.cartList.find(item => item.id == payload.id);
    if (oldProduct) {
      context.commit(types.ADD_COUNT, oldProduct);
    } else {
      payload.count = 1;
      payload.checked = true;
      context.commit(types.ADD_TO_CART, payload)
    }
  }
}
