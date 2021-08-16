<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, key) in titles"
          :key="key"
          class="title-item"
          :class="{ active: key === currentIndex }"
          @click="titleClick(key)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(key) {
      this.currentIndex = key;
      // console.log(key);
      this.$emit('titleClick',key);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
  line-height: 44px;
}
.title-item {
  flex: 1;
  line-height: 60px;
}
.active {
  color: red;
}
.back {
  margin-top: 14px;
}
</style>