import * as types from './mutation_type'
export default {
  [types.ADD_TO_CART](state,payload){
    state.cartList.push(payload)
  },
  [types.ADD_COUNT](state,payload){
    payload.count++
  },
  [types.CHANGE_CHECKED](state,payload){
    payload.checked = !payload.checked
  },
  [types.CHECKED_ALL](state,payload){
    console.log(state)
    state.cartList.forEach(item => item.checked = payload)
  }
}
