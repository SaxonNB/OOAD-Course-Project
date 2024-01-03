<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="评论用户" prop="commenterName"></el-table-column>
      <el-table-column label="评论建筑物名" prop="buildingName"></el-table-column>
      <el-table-column label="评论内容" prop="content">
        <template slot-scope="scope">
          <!-- 显示评论内容 -->
          {{ scope.row.content }}
          <!-- 显示评论图片 -->
          <!-- 显示评论图片 -->

          <!-- 显示评论图片 -->
          <div v-if="scope.row.photos && scope.row.photos.length > 0">
            <img v-for="(photo, index) in scope.row.photos" :key="index" :src="photo.path" alt="评论图片" style="max-width: 50px; max-height: 50px;">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 使用 v-if 来判断显示的文本 -->
          <el-switch v-model="scope.row.commentStatus" :active-text="'通过'" :inactive-text="'不通过'" @change="handleBlock(scope.row)"/>
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
      console.log("zzz")
      console.log(responseData)

      // 为每个评论对象添加 commentStatus 字段
      this.tableData = responseData.map(comment => {
        return {
          ...comment,
          commentStatus: comment.status === 'APPROVED',
        };
      });
      console.log("yyy")
      console.log(this.tableData)
    },
    async handleBlock(comment) {
      try {
        if (comment.commentStatus === false) {
          console.log('开始禁止评论')
          await BlockComments(comment.id);
          console.log('禁止成功');
        } else {
          console.log('开始通过评论')
          await UnBlockComments(comment.id);
          console.log('通过评论成功');
        }
      } catch (error) {
        console.error('操作失败:', error);
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
