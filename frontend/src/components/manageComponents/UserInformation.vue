<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="账户" prop="name"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="属性" prop="property"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isBlocked" active-text="禁言" inactive-text="正常"
            @change="handleBlock(scope.row, scope.$index)" />
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length" />

    <el-button type="primary" @click="handleBatchAdd">添加数据</el-button>

    <el-dialog title="批量添加数据" :visible.sync="batchDialogVisible">
      <el-table :data="batchFormData" style="width: 100%">
        <el-table-column label="账户" prop="name"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="属性" prop="property"></el-table-column>
      </el-table>

      <el-form :model="newData" label-width="80px">
        <el-form-item label="账户" prop="name">
          <el-input v-model="newData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newData.password"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer">
        <el-button @click="addNewData">添加</el-button>
        <el-button @click="batchDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleBatchAddConfirm">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import axios from 'axios';
import { getAllUsers, blockUser, unblockUser, addUser } from '@/api/admin';
export default {
  name: "UserInformation",
  data() {
    return {
      batchDialogVisible: false,
      batchFormData: [], // 修改为一个空数组
      newData: { name: '', password: '', property: 'USER' }, // 新的输入数据
      tableData: [
      ],
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
      const responseData = (await getAllUsers()).data;
      // 将响应式对象转换为普通 JavaScript 对象
      const transformedData = responseData.map(item => {
        if (Array.isArray(item)) {
          // 如果是数组，转换为对象
          return { name: item[0], password: item[1], property: item[2] };
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
          await blockUser(user.name);
          console.log('拉黑成功');
        } catch (error) {
          console.error('拉黑失败:', error);
        }

      } else {
        // 如果已经被拉黑，调用取消拉黑的接口
        try {
          await unblockUser(user.name);
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
    addNewData() {
      // 将新输入的数据添加到 batchFormData 中
      this.batchFormData.push({ ...this.newData });
      // 清空输入框
      this.newData = { name: '', password: '', property: 'USER' };
    },
    handleBatchAdd() {
      this.batchDialogVisible = true;
    },
    async handleBatchAddConfirm() {
      // 批量添加逻辑
      const validData = this.batchFormData.filter(data => data.name && data.password && data.property);
      const validData1 = this.batchFormData.filter(data => data.name && data.password);
      console.log('--------------------------------------------------')
      console.log(validData)
      const result = await addUser(validData1);
      const successUsers = result.data;
      console.log('qqq')
      console.log(successUsers)
      // 遍历批量数据，调用注册用户的接口
      validData.forEach(async userData => {
        try {
          console.log(userData.name)
          console.log(successUsers)
          if (successUsers.includes(userData.name)){
            this.tableData.push(userData);
            console.log(`用户 ${userData.name} 注册成功`);
          }else {
            this.$message({
              message: userData.name+'注册失败',
              type: "error"
            });
          }

        } catch (error) {
          console.error(`用户 ${userData.name} 注册失败:`, error);
        }
      });

      // 清空数据
      this.batchFormData = [];
      this.batchDialogVisible = false;
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
