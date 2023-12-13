<!-- RouteSearch.vue -->
<template>
  <div class="route-search">
    <h2>路线查询</h2>
    <label>选择起始建筑物:</label>
    <select v-model="startBuilding">
      <!-- 在这里添加建筑物选项 -->
    </select>

    <label>选择目标建筑物:</label>
    <select v-model="targetBuilding">
      <!-- 在这里添加建筑物选项 -->
    </select>

    <button @click="searchRoutes">查询路线</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startBuilding: null,
      targetBuilding: null,
    };
  },
  methods: {
    searchRoutes() {
      // 执行路线查询的逻辑，可以通过路由或其他方式导航到路线结果页面
      // 例如：this.$router.push(`/routes?start=${this.startBuilding}&target=${this.targetBuilding}`);
    },
  },
};
</script>

<style scoped>
/* 在这里添加样式 */
.route-search {
  /* 样式 */
}
</style>
