<template>
    <body id="poster">
        <el-container class="container">
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu :default-active="activeMenu" class="el-menu-vertical-demo">
                    <el-menu-item index="UserInformation"
                        @click="handleMenuItemClick('UserInformation')">用户信息</el-menu-item>
                    <el-menu-item index="BuildingInformation"
                        @click="handleMenuItemClick('BuildingInformation')">楼宇信息</el-menu-item>
                    <el-menu-item index="ProjectStatus" @click="handleMenuItemClick('ProjectStatus')">项目情况</el-menu-item>
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
export default {
    name: "ManageComponent",
    data() {
        return {
            activeMenu: 'UserInformation', // 默认选中的菜单项
        };
    },
    methods: {
        handleLogout() {
            // 处理退出登录事件
            // 这里可以添加退出登录的逻辑
            this.$router.push(`/home`);
            console.log('Logout');
        },
        handleMenuItemClick(index) {
            // 检查当前路径是否已经是目标路径
            const currentPath = this.$route.path;
            const targetPath = `/manage/${index}`;

            if (currentPath !== targetPath) {
                // 导航到目标路径
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
</style>
