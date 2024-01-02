<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="评论用户" prop="commentUser"></el-table-column>
      <el-table-column label="评论建筑物名" prop="commentBuilding"></el-table-column>
      <el-table-column label="评论内容" prop="commentContent">
        <template slot-scope="scope">
          <!-- 显示评论内容 -->
          {{ scope.row.commentContent }}
          <!-- 显示评论图片 -->
          <img v-if="scope.row.commentImage" :src="scope.row.commentImage" alt="评论图片" style="max-width: 50px; max-height: 50px;">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isBlocked" active-text="通过" inactive-text="禁止" @change="handleBlock(scope.row, scope.$index)"/>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                   :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length"/>

  </div>
</template>

<script>
// import axios from 'axios';
import {getComments, BlockComments, UnBlockComments,} from '@/api/comment';

export default {
  name: "UserComment",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  computed: {
    // 计算属性，用于获取当前页的数据
    currentTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    async fetchData() {
      const responseData = (await getComments()).data;
      // 将响应式对象转换为普通 JavaScript 对象
      const transformedData = responseData.map(item => {
        if (Array.isArray(item)) {
          // 如果是数组，转换为对象
          return {comment: item[0]};
        } else {
          // 如果是对象，直接返回
          return item;
        }
      });
      this.tableData = transformedData;
    },
    async handleBlock(user) {
      // 判断用户是否已被拉黑
      if (user.isBlocked) {
        // 如果未被拉黑，调用拉黑的接口
        try {
          await BlockComments(user.comment);
          console.log('拉黑成功');
        } catch (error) {
          console.error('拉黑失败:', error);
        }

      } else {
        // 如果已经被拉黑，调用取消拉黑的接口
        try {
          await UnBlockComments(user.comment);
          console.log('取消拉黑成功');
        } catch (error) {
          console.error('取消拉黑失败:', error);
        }

      }
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 当改变每页显示条数时，将当前页重置为第一页
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    // 在组件挂载时获取数据
    this.fetchData();
  },
};
</script>

<style scoped>
/* 样式 */
</style>
  