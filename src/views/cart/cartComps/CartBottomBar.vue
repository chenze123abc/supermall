<template>
 <div class="cart-buttom">
    <div class="check-all">
    <div class="all-icon">
      <check-button :is-checked="isCheckedAll" @click.native="allClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total">{{totalPrice}}</div>
    <div class="calculate"  @click="toPay">去计算({{checkedLength}})</div>
  </div>
 </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"
import {mapGetters} from "vuex"
export default {
name:"CartButtonBar",
components:{
  CheckButton
},
computed:{
  ...mapGetters(['cartList','achiveChecked','cartLength']),
  totalPrice(){
    return '￥'+this.cartList.filter((item)=>{
      return item.checked
    }).reduce((preValue,item)=>{
      return preValue+item.price*item.count},0).toFixed(2)
    },
  checkedLength(){
      return this.achiveChecked.length;
    },
  isCheckedAll(){
          if (this.cartLength === 0) {
        return false;
      } else {
        return this.achiveChecked.length === this.cartLength;
      }
    }
  },
  methods:{
    allClick(){
      if(this.isCheckedAll){
        this.cartList.forEach((item)=>{
          item.checked=false
        })
      }else{
        this.cartList.forEach((item)=>{
          item.checked=true
        })
      }
    },
    toPay(){
      if(this.checkedLength===0){
        this.$toast.show("请选择购买的商品！",1500)
      }
    }
  }
}

</script>

<style scoped>
.cart-buttom{
  position: relative;
  background-color: pink;
  height: 40px;
  display: flex;
}
.check-all {
  color: #000;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.all-icon {
  padding-left: 10px;
  width: 70px;
  display: flex;
  justify-content: space-around;
}
.total{
  padding-left: 20px;
}
.calculate{
  background: #ff5777;
  width: 80px;
  height: 100%;
  line-height: 40px;
  margin-left:155px;
  text-align: center;
}
</style>