<template>

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
