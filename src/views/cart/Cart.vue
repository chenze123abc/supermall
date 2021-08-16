<template>
<div class="cart">
  <nav-bar class="nav-bar">
  <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>
  <cart-list></cart-list>
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script> 
import NavBar from "components/common/navbar/NavBar"
import CartList from "./cartComps/CartList"
import CartBottomBar from "./cartComps/CartBottomBar"
import { mapGetters } from "vuex"

export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
    ...mapGetters(['cartLength','cartList'])
  },
};
</script>

<style scoped>

.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;
}
.cart{
  height: 100vh;
}
</style>
