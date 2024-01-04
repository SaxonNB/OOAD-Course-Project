<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="名称" prop="routeName"></el-table-column>
      <el-table-column label="车站" prop="stations">
        <template slot-scope="scope">
          <ul>
            <li v-for="station in scope.row.stations" :key="station.id">{{ station.name }}</li>
          </ul>
        </template>
      </el-table-column>
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
    <el-dialog title="添加数据" :visible.sync="dialogVisible" v-if="formData !== null">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="名称" prop="routeName">
          <el-input v-model="formData.routeName"></el-input>
        </el-form-item>
        <el-form-item label="车站" prop="stations">
          <el-select v-model="formData.selectedStations" multiple filterable>
            <el-option v-for="station in allStations" :key="station.id" :label="station.name" :value="station.id"/>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;">取消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑信息" :visible.sync="editDialogVisible" v-if="editedRowData !== null">
      <el-form :model="editedRowData" label-width="80px">
        <el-form-item label="名称" prop="routeName">
          <el-input v-model="editedRowData.routeName"></el-input>
        </el-form-item>
        <el-form-item label="车站" prop="stations">
          <el-select v-model="editedRowData.selectedStations" multiple filterable>
            <el-option v-for="station in allStations" :key="station.id" :label="station.name" :value="station.id"/>
          </el-select>
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
import {AllRoutes, EditRoutes, AddRoutes, getAllStation} from '@/api/route';

export default {
  name: "BusRoute",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      editDialogVisible: false,
      dialogVisible: false,
      editedRowData: {
        routeId: '',
        routeName: '',
        selectedStations: [],
      },
      tempEditData:{
        routeId: '',
        routeName: '',
        selectedStations: [],
      },
      formData: {
        routeName: '',
        selectedStations: [],
      },
      allStations: [], // List of all available stations
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
    async fetchData() {
      this.tableData = (await AllRoutes()).data;
      console.log(this.tableData);
      this.allStations = (await getAllStation()).data;
      console.log(this.allStations);
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleEdit(row) {
      // this.editedRowData = {...row};
      console.log({...row})
      // // 映射车站的 ID 数组为车站对象数组
      // // 映射车站对象数组为只包含 id 的数组
      this.tempEditData = { ...row };

      // 提取 selectedStations 的值
      const selectedStations = this.tempEditData.stations.map(station => station.id);
      this.editedRowData.selectedStations = selectedStations;
      this.editedRowData.routeId = this.tempEditData.routeId;
      this.editedRowData.routeName = this.tempEditData.routeName

      console.log('temp Edited Row Data:', this.tempEditData);
      console.log('Edited Row Data:', this.editedRowData);
      this.editDialogVisible = true;
    },
    async saveEditedData() {
      const {routeId, routeName, selectedStations} = this.editedRowData;

      // 创建新的数组，确保触发 Vue.js 的响应性
      const newSelectedStations = [...selectedStations];
      console.log('Save Edited Data:', this.editedRowData);
      const temp = new FormData();
      temp.append('routeId', routeId);
      temp.append('routeName', routeName);

      // 使用新的数组
      temp.append('selectedStations', newSelectedStations);

      await EditRoutes(temp);

      console.log('Data after EditRoutes:', this.editedRowData);
      this.editedRowData = {
        routeId: '',
        routeName: '',
        selectedStations: [],
      };
      this.$forceUpdate();
      await this.fetchData();

      // 关闭编辑对话框
      this.editDialogVisible = false;
    },
    async handleAddConfirm() {
      const temp = new FormData();
      console.log('formData is :',this.formData)
      const {routeName, selectedStations} = this.formData;
      console.log('rrr')
      console.log(routeName)

      // const route = {
      //   name: routeName,
      //   stations: selectedStations,
      // };

      temp.append('routeName', routeName);
      temp.append('selectedStations', selectedStations);
      console.log(temp);

      await AddRoutes(temp);
      console.log('fff')
      console.log(this.tableData)
      await this.fetchData();
      this.dialogVisible = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
/* 样式 */
</style>
