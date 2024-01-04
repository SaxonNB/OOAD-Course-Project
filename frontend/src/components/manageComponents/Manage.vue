<template>

  <body id="poster">
  <AdminHeader></AdminHeader>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="height: 100%;">
      <el-menu background-color="#fff" text-color="#000" active-text-color="#FFCCCC" :default-active="activeMenu" class="el-menu-vertical-demo">
        <el-menu-item index="UserInformation"
                      @click="handleMenuItemClick('UserInformation')">用户信息
        </el-menu-item>
        <el-menu-item index="BuildingInformation"
                      @click="handleMenuItemClick('BuildingInformation')">楼宇信息
        </el-menu-item>
        <el-menu-item index="CuisineProduct" @click="handleMenuItemClick('CuisineProduct')">菜品</el-menu-item>
        <el-menu-item index="CuturalProduct" @click="handleMenuItemClick('CuturalProduct')">文创产品</el-menu-item>
        <el-menu-item index="BusStation" @click="handleMenuItemClick('BusStation')">公交车站</el-menu-item>
        <el-menu-item index="BusRoute" @click="handleMenuItemClick('BusRoute')">公交线</el-menu-item>
        <el-menu-item index="UserComment" @click="handleMenuItemClick('UserComment')">用户评论</el-menu-item>
        <el-menu-item index="DataStatistics" @click="handleMenuItemClick('DataStatistics')">数据统计</el-menu-item>
        <el-menu-item index="Orders" @click="handleMenuItemClick('Orders')">订单管理</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧内容区域 -->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-button type="default" @click="handleLogout">退出</el-button>
      </el-header>

      <el-main>
        <!-- 路由视图，用于显示子页面 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </body>
</template>

<script>
import AdminHeader from "@/components/welcomeComponents/AdminHeader.vue";

export default {
  name: "ManageComponent",
  components: { AdminHeader },
  data() {
    return {
      activeMenu: '', // Remove the default value
    };
  },
  created() {
    // Set activeMenu based on the current route
    this.activeMenu = this.$route.params.categoryc;
  },
  methods: {
    handleLogout() {
      this.$router.push(`/home`);
      console.log('Logout');
    },
    handleMenuItemClick(index) {
      const currentPath = this.$route.path;
      const targetPath = `/manage/${index}`;

      if (currentPath !== targetPath) {
        this.$router.push(targetPath);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
.el-aside {
  margin-top: 60px; /* 调整这个值来控制侧边栏与顶部的距离 */
  height: 100%; /* Set the height to 100% */
}
</style>
