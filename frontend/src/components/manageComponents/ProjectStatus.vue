<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="销售情况" prop="sales"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          <el-button type="primary" @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                   :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length" />

    <!-- 添加数据的按钮 -->
    <el-button type="primary" @click="handleAdd">添加数据</el-button>

    <!-- 添加数据的弹窗 -->
    <el-dialog title="添加数据" :visible.sync="dialogVisible">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="类型" prop="type">
          <el-input v-model="formData.type"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="销售情况" prop="sales">
          <el-input v-model="formData.sales"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改数据的弹窗 -->
    <el-dialog title="修改数据" :visible.sync="editDialogVisible">
      <el-form :model="editFormData" label-width="80px">
        <el-form-item label="类型" prop="type">
          <!-- 注意这里绑定的是editFormData.type -->
          <el-input v-model="editFormData.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editFormData.price"></el-input>
        </el-form-item>
        <el-form-item label="销售情况" prop="sales">
          <el-input v-model="editFormData.sales"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "ProjectStatus",
  data() {
    return {
      tableData: [
        { type: '餐饮', price: 50, sales: 100 },
        { type: '文创产品', price: 30, sales: 80 },
      ],
      currentPage: 1,
      pageSize: 5,
      dialogVisible: false,
      editDialogVisible: false,
      formData: {
        type: '',
        price: '',
        sales: '',
      },
      editFormData: {
        type: '',
        price: '',
        sales: '',
      },
    };
  },
  computed: {
    currentTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    handleDelete(index) {
      this.tableData.splice(index, 1);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleAdd() {
      this.dialogVisible = true;
    },
    // 新增代码：确认添加数据
    handleAddConfirm() {
      this.tableData.push({
        type: this.formData.type,
        price: this.formData.price,
        sales: this.formData.sales,
      });
      this.formData.type = '';
      this.formData.price = '';
      this.formData.sales = '';
      this.dialogVisible = false;
    },
    // 新增代码：处理编辑按钮点击事件
    handleEdit(row) {
      this.editDialogVisible = true;
      this.editFormData = { ...row };
    },
    // 新增代码：确认编辑数据
    handleEditConfirm() {
      const index = this.tableData.findIndex(item => item.type === this.editFormData.type);
      if (index !== -1) {
        this.tableData.splice(index, 1, { ...this.editFormData });
        this.editFormData = { type: '', price: '', sales: '' };
        this.editDialogVisible = false;
      }
    },
  },
};
</script>

<style scoped>
/* 样式 */
</style>