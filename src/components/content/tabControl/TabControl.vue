<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, key) in titles"
      :key="key"
      :class="{ active: key === currentIndex }"
      @click="itemClick(key)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(key) {
      this.currentIndex = key;
      this.$emit("tabClick", key);
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: #ffff;
  z-index: 10;
}
.tab-control-item {
  flex: 1;
}
.active span {
  color: red;
  border-bottom: 3px solid red;
  padding: 5px;
}
</style>
