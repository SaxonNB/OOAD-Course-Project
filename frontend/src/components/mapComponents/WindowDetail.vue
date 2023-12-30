<template>
  <div>
    <h3>{{ building.name }}</h3>
    <p>{{ building.introduction }}</p>
    <img :src="building.path" style="max-width: 100%; height: 200px;">
    <button @click="showDetail">查看详细信息</button>
  </div>
</template>

<script>
export default {
  props: {
    building: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showDetail() {
      // 调用父组件的 showDetails 方法，传递建筑物 ID 或其他必要的信息
      this.$emit('show-details', this.building.id);
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
h3, p {
  margin-bottom: 10px;
}
</style>
