<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="账户" prop="account"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    />
    
    <el-button type="primary" @click="handleAdd">添加数据</el-button>

    <el-dialog title="添加数据" :visible.sync="dialogVisible">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="账户" prop="account">
          <el-input v-model="formData.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserInformation",
  data() {
    return {
      tableData: [
        { account: 'user1', password: 'password1' },
        { account: 'user2', password: 'password2' },
        { account: 'user3', password: 'password3' },
        { account: 'user4', password: 'password4' },
        { account: 'user5', password: 'password5' },
        { account: 'user6', password: 'password6' },
      ],
      currentPage: 1,
      pageSize: 5,
      dialogVisible: false,
      formData: {
        account: '',
        password: '',
      },
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
    handleDelete(index) {
      // 实现删除功能
      this.tableData.splice(index, 1);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 当改变每页显示条数时，将当前页重置为第一页
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleAdd() {
      // 打开添加数据的弹窗
      this.dialogVisible = true;
    },
    handleAddConfirm() {
      // 确认添加数据
      this.tableData.push({ account: this.formData.account, password: this.formData.password });
      // 清空表单数据
      this.formData.account = '';
      this.formData.password = '';
      // 关闭弹窗
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
/* 样式 */
</style>
