<template>
  <div class="goods">
    <goods-list-item
      class="goodslist"
      v-for="(item, key) in goods"
      :key="key"
      :goods-item="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "goodslist",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>