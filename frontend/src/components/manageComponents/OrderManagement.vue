<template>
  <div>
    <el-table :data="currentTableData" style="width: 100%">
      <el-table-column label="订单id" prop="id"></el-table-column>
      <el-table-column label="购买人" prop="purchaserName"></el-table-column>
      <el-table-column label="订单内容" prop="content"></el-table-column>
      <el-table-column label="总价" prop="totalPrice"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="handleFinishOrder(scope.row.id)">完成订单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                   :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="tableData.length" />
  </div>
</template>

<script>
import {finishOrderApi, getOrdersApi} from "@/api/order";

export default {
  name: "ProjectStatus",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    currentTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.tableData.slice(start, end);
    },
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    async handleFinishOrder(orderId) {
      let result;
      try {
        result = (await finishOrderApi(orderId)).data;
      } catch (e) {
        this.$message.error('无法完成订单！');
        return;
      }
      if (result === 'success') {
        this.$message.success('订单完成成功！');
        setTimeout(
            () => window.location.reload(),
            1000
        )
      } else {
        this.$message.error(result);
      }
    },
    async fetchData() {
      this.tableData = (await getOrdersApi()).data;
      for (const id in this.tableData) {
        const row = this.tableData[id];
        row.content = "";
        let first = true;
        for (const goodsId in row.items) {
          const goods = row.items[goodsId];
          if (!first) {
            row.content += ', ';
          }
          first = false;
          row.content += goods.goodsName;
        }
      }
    }
  },
};
</script>

<style scoped>
/* 样式 */
</style>
