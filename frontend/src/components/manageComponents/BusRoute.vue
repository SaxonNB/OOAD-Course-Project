<template>
    <div>
      <el-table :data="currentTableData" style="width: 100%">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="车站" prop="station"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <!-- 添加编辑按钮 -->
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
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
          <el-form-item label="车站" prop="station">
            <el-input v-model="formData.station"></el-input>
          </el-form-item>
        </el-form>
  
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false;">取消</el-button>
          <el-button type="primary" @click="handleAddConfirm">确定</el-button>
        </div>
      </el-dialog>
  
  
      <el-dialog title="编辑信息" :visible.sync="editDialogVisible" v-if="editedRowData !== null">
        <el-form :model="editedRowData" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="editedRowData.name"></el-input>
          </el-form-item>
          <el-form-item label="车站" prop="station">
            <el-input v-model="editedRowData.station"></el-input>
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
  import { AllRoutes, EditRoutes, AddRoutes, } from '@/api/route';
  export default {
    name: "BusRoute",
    data() {
      return {
        tableData: [
        ],
        currentPage: 1,
        pageSize: 5,
        editDialogVisible: false,
        dialogVisible: false,
        editedRowData: null, // 保存编辑的行数据
        formData: {          // 保存添加的行数据
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
      async fetchData() {
        const responseData = (await AllRoutes()).data;
        // 将响应式对象转换为普通 JavaScript 对象
        const transformedData = responseData.map(item => {
          if (Array.isArray(item)) {
            // 如果是数组，转换为对象
            return { name: item[0], station: item[1]};
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
  
        await EditRoutes(this.editedRowData);
  
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
  
        await AddRoutes(this.formData);
  
        this.tableData.push({
          name: this.formData.name,
          latitude: this.formData.station,
        });
  
  
        this.formData.name = '';
        this.formData.station = '';
  
        this.dialogVisible = false;
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
  