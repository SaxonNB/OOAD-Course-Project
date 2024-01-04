<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="标签" prop="tag"></el-table-column>
      <el-table-column label="描述" prop="description"></el-table-column>
      <el-table-column label="细节" prop="details"></el-table-column>
      <el-table-column label="纬度" prop="latitude"></el-table-column>
      <el-table-column label="经度" prop="longitude"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <!-- 添加编辑按钮 -->
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                   :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length"/>

    <el-button type="primary" @click="dialogVisible = true">添加数据</el-button>

    <!-- 添加数据的弹窗 -->
    <el-dialog title="添加数据" :visible.sync="dialogVisible">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-select v-model="formData.tag" placeholder="请选择">
            <el-option label="校门" value="校门"></el-option>
            <el-option label="科研楼" value="科研楼"></el-option>
            <el-option label="餐厅" value="餐厅"></el-option>
            <el-option label="医院" value="医院"></el-option>
            <el-option label="运动场地" value="运动场地"></el-option>
            <el-option label="宿舍" value="宿舍"></el-option>
            <el-option label="图书馆" value="图书馆"></el-option>
            <el-option label="教学楼" value="教学楼"></el-option>
            <el-option label="超市" value="超市"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item label="细节" prop="details">
          <el-input v-model="formData.details"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="formData.latitude"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="formData.longitude"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" style="position: relative;">
          <input type="file" @change="handleFileUpload"
                 style="position: absolute; top: 0; left: 0; opacity: 100; width: 100%; height: 100%;"/>
          <img v-if="selectedFileUrl" :src="selectedFileUrl" alt="Selected Image"
               style="max-width: 100%; max-height: 200px; margin-top: 10px; box-sizing: border-box; border: 1px solid #ccc; padding: 5px;"/>
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
        <el-form-item label="标签" prop="tag">
          <el-select v-model="editedRowData.tag" placeholder="请选择">
            <el-option label="校门" value="校门"></el-option>
            <el-option label="科研楼" value="科研楼"></el-option>
            <el-option label="餐厅" value="餐厅"></el-option>
            <el-option label="医院" value="医院"></el-option>
            <el-option label="运动场地" value="运动场地"></el-option>
            <el-option label="宿舍" value="宿舍"></el-option>
            <el-option label="图书馆" value="图书馆"></el-option>
            <el-option label="教学楼" value="教学楼"></el-option>
            <el-option label="超市" value="超市"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="editedRowData.description"></el-input>
        </el-form-item>
        <el-form-item label="细节" prop="details">
          <el-input v-model="editedRowData.details"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="editedRowData.latitude"></el-input>
        </el-form-item>
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="editedRowData.longitude"></el-input>
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
import {AllBuildings, EditBuildings, AddBuildings} from '@/api/building';

export default {
  name: "BuildingInformation",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      editDialogVisible: false,
      dialogVisible: false,
      editedRowData: null, // 保存编辑的行数据
      formData: {},
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
      const responseData = (await AllBuildings()).data;
      console.log('11')
      console.log(responseData)
      // 将响应式对象转换为普通 JavaScript 对象
      const transformedData = responseData.map(item => {
        if (Array.isArray(item)) {
          // 如果是数组，转换为对象
          return {
            name: item[0],
            tag: item[1],
            description: item[2],
            details: item[3],
            latitude: item[4],
            longitude: item[5]
          };
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
      this.editedRowData = {...row};
      this.editDialogVisible = true;
      console.log(row);
    },
    async saveEditedData() {
      // 在这里保存编辑后的数据，可以发起请求等操作
      console.log(this.editedRowData);

      await EditBuildings(this.editedRowData);
      await this.fetchData();
      // 保存完成后关闭编辑对话框
      this.editDialogVisible = false;
    },
    // 新增代码：确认添加数据
    async handleAddConfirm() {
      try {
        // Create a FormData object
        const formData = new FormData();

        // Append form data properties to the FormData object
        formData.append('name', this.formData.name);
        formData.append('tag', this.formData.tag);
        formData.append('description', this.formData.description);
        formData.append('details', this.formData.details);
        formData.append('latitude', this.formData.latitude);
        formData.append('longitude', this.formData.longitude);

        // Append the file to the FormData object
        if (this.selectedFile) {
          formData.append('file', this.selectedFile, this.selectedFile.name);
        }

        // Call the server-side API with the FormData object
        await AddBuildings(formData);

        // Update front-end data after successful addition
        await this.fetchData();
        // Reset form data
        this.formData.name = '';
        this.formData.tag = '';
        this.formData.description = '';
        this.formData.details = '';
        this.formData.latitude = '';
        this.formData.longitude = '';

        // Close the dialog
        this.dialogVisible = false;

        // Clear file selection
        this.selectedFile = null;
        this.selectedFileUrl = '';
      } catch (error) {
        // Handle the case where adding data fails
        console.error('Error adding data:', error);
      }
    },

    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.selectedFileUrl = URL.createObjectURL(this.selectedFile);
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
