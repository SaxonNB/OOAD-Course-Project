<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="数量" prop="quantity"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img v-if="scope.row.image" :src="scope.row.image" alt="Product Image" style="max-width: 50px; max-height: 50px;">
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <!-- 添加编辑按钮 -->
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length" />

    <el-button type="primary" @click="dialogVisible = true">添加数据</el-button>

    <!-- 添加数据的弹窗 -->
    <el-dialog title="添加数据" :visible.sync="dialogVisible">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="formData.quantity"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" style="position: relative;">
          <input type="file" @change="handleFileUpload"
            style="position: absolute; top: 0; left: 0; opacity: 100; width: 100%; height: 100%;" />
          <img v-if="selectedFileUrl" :src="selectedFileUrl" alt="Selected Image"
            style="max-width: 100%; max-height: 200px; margin-top: 10px; box-sizing: border-box; border: 1px solid #ccc; padding: 5px;" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false; selectedFile = null; selectedFileUrl = ''">取消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="编辑信息" :visible.sync="editDialogVisible" v-if="editedRowData !== null">
      <el-form :model="editedRowData" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editedRowData.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editedRowData.price"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="editedRowData.quantity"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEditedData">保存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
// import axios from 'axios';
import { AllCuisines, EditCuisines, AddCuisines, } from '@/api/cuisine';
export default {
  name: "CuisineProduct",
  data() {
    return {
      tableData: [
      ],
      currentPage: 1,
      pageSize: 5,
      editDialogVisible: false,
      dialogVisible: false,
      editedRowData: null, // 保存编辑的行数据
      formData: {
        // 保存添加的行数据
        name: '',
        price: '',
        quantity: '', // 新增数量属性
        image: null, // 新增图片属性
      },
      selectedFile: null,
      selectedFileUrl: '', // 添加用于存储数据 URL 的属性
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
      const responseData = (await AllCuisines()).data;
      console.log(responseData)
      // 将响应式对象转换为普通 JavaScript 对象
      const transformedData = responseData.map(item => {
        if (Array.isArray(item)) {
          // 如果是数组，转换为对象
          return { name: item[0], price: item[1], quantity: item[2], image: item[3]};
        } else {
          // 如果是对象，直接返回
          return item;
        }
      });
      this.tableData = transformedData;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1; // 当改变每页显示条数时，将当前页重置为第一页
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleEdit(row) {

      // 可以在这里打开编辑对话框，并将编辑的行数据保存在 data 中
      this.editedRowData = { ...row };
      this.editDialogVisible = true;
      console.log(row);
    },
    async saveEditedData() {
      // 在这里保存编辑后的数据，可以发起请求等操作
      console.log(this.editedRowData);

      await EditCuisines(this.editedRowData);

      // 找到要替换的行的索引
      const index = this.tableData.findIndex(item => item.id === this.editedRowData.id);

      // 如果找到了对应的行
      if (index !== -1) {
        // 替换行数据
        this.$set(this.tableData, index, { ...this.editedRowData });
      }
      // 保存完成后关闭编辑对话框
      this.editDialogVisible = false;
    },
    // 新增代码：确认添加数据
    async handleAddConfirm() {
      // 将其他表单项数据加入 FormData

      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('price', this.formData.price);
      formData.append('quantity', this.formData.quantity); // 添加数量
      formData.append('image', this.selectedFile); // 添加图片
      console.log(formData);

      await AddCuisines(formData);

      this.tableData.push({
        name: this.formData.name,
        price: this.formData.price,
      });


      this.formData.name = '';
      this.formData.price = '';

      this.dialogVisible = false;
      this.selectedFile = null;
      this.selectedFileUrl = '';
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileUrl = URL.createObjectURL(this.selectedFile);
    },
    async handleDelete(index) {
      this.tableData.splice(index, 1);
      //这里要加像后端发送的代码
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
