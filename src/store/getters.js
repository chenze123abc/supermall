export default{
    cartLength(state){
        return state.cartList.length
    },
    cartList(state){
        return state.cartList
    },
    achiveChecked(state){
        return state.cartList
        .filter(val => {
          return val.checked === true;
        })
    }
}