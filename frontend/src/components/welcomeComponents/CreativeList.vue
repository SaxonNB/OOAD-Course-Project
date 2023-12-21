<template>
  <div class="total">
    <menu class="menu">
      <ul>
        <li><a href="/home">首页</a></li>
        <li><a href="/building">建筑信息</a></li>
        <li><a href="/user/login">评论区</a></li>
        <li><a href="/restaurant-reservation">线上食堂</a></li>
        <li><a href="/creative-products">南科文创</a></li>
        <li><a href="/creative-products/creative-list">购物车</a></li>
      </ul>
    </menu>
    <div class="header">
      <el-container class="yy" >
        <el-header style="text-align: right" class="login" >
          <button  style="margin-right: 20px" @click="$router.push({path:'/user/login'})">用户登录</button>
          <button @click="$router.push({path:'/manage'})">管理员界面</button>
        </el-header>
      </el-container>
      <h1 class="title1">购物车</h1>
    </div>
    <div class="creativeTable" id="creativeTable">
      <table>
        <thead>
        <tr>
          <th>商品名称</th>
          <th>商品价格</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody id="tbody">
        <tr v-for="item in tableData" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <input type="button" value="删除" @click="handleDelete">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
    />
    <div class="sum" id="sum">
      <table>
        <tbody>
        <tr class="count"></tr>
        </tbody>
      </table>
      <br/>
      <input type="button" class="add" value="添加" id="add" style="margin-right: 20px" @click="$router.push({path:'/restaurant-reservation'})">
      <input type="button" class="pay" value="提交订单" id="pay" @click="$router.push({path:'/user/login'})">
    </div>
  </div>
</template>
<script>
export default {
  name:"CreativeList",
  data(){
    return{
      tableData:[
        {name:'南科笔记本',price:'30元'},
        {name:'南科冰箱贴',price:'85元'},
        {name:'南科日历',price:'58元'},
        {name:'南科签字笔',price:'10元'},
        {name:'南科雨伞',price:'65元'},
        {name:'南科明信片1',price:'8元'},
        {name:'南科书签',price:'8元'},
        {name:'南科杯垫',price:'8元'},
      ],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      editDialogVisible: false,
      formData: {
        name: '',
        price: '' ,
      },
      editFormData: {
        name: '',
        price: '',
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
        name: this.formData.name,
        price: this.formData.price,
      });
      this.formData.name = '';
      this.formData.price = '';
      this.dialogVisible = false;
    },
    // 新增代码：处理编辑按钮点击事件
    handleEdit(row) {
      this.editDialogVisible = true;
      this.editFormData = { ...row };
    },
    // 新增代码：确认编辑数据
    handleEditConfirm() {
      const index = this.tableData.findIndex(item => item.name === this.editFormData.name);
      if (index !== -1) {
        this.tableData.splice(index, 1, { ...this.editFormData });
        this.editFormData = { name: '', price: '',  };
        this.editDialogVisible = false;
      }
    },
    getImageUrl(picture) {
      // 在这里根据图片路径的规则，拼接完整的图片 URL
      // 返回完整的图片 URL，用于 <img> 的 src 属性
      return `path/to/images/${picture}`;
    },
    comment(){
      //用一个flag标志，是登录网站传入的，如果没有登录，则点击评论后会跳转到登陆界面，直到登录成功后才会跳转到评论区
      var flag=false;
      if(flag ==true){
        this.$router.push({path:'/comments'})
      }else{
        this.$router.push({path:'/user/login'})
        flag=true
      }
      this.$router.push({path:'/comments'})
    },
    total(){
      //计算总价，存在bug
      var total=0;
      var table=document.getElementById("creativeTable");
      //var sum=document.getElementById("sum");
      var rows=table.rows;
      //var cells=table.cells;
      //(".foodTable").empty();//每次加载时清空最后一列，防止二次加载数据时出现多行合计
      for(var i=1;i<rows.length-1;i++){//从i=1第二行开始去掉表头，rows.length-1结束，去掉合计行
        var a =parseInt(rows[i].cells[1].innerHTML.trim());//获取每一列的值
        total=total+a; //计算
      }
      //(".count").append("<td>"+total+"</td>");

    }
  },
};
</script>
<style scoped>
.total{
  background-color: antiquewhite;
}
.header{
  text-align: center;
  padding: 5px;
  height: 70px;
  margin-top: 0px;
  margin-bottom: 10px;
}
.menu{
  background-color: #f9f519;
}
ul{
  list-style: none;
  display: flex;
}
ul li{
  display: inline;
  flex: 1;
  color: #00b2ff;
  float: left;
  height: 20px;
}

.yy{
  margin-bottom: 0;
  margin-inside: 0px;
  text-align: left;
  height: 0px;
}
.title1{
  color: #f9195c;
  font-size: 60px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.creativeTable{
  border: 20px #7ad6f5;
  border-collapse: separate;
  border-spacing: 1px;
  margin: 1px auto;
  margin-left: 350px;
}
th {
  border: 1px solid black;
  padding: 20px;
  text-align: center;
  font-size: 20px;
  background-color: #f9ae19;
  width: 200px;
}
tr:nth-child(even){
  background-color: #f9ae19;
}
tr:nth-child(odd){
  background-color: #ffffff;
}

td {
  border: 1px solid black;
  padding: 15px;
//background-color: #19f9d7;
  text-align: center;
  font-style: oblique;
  font-size: 15px;
}
.pay{
  width: 80px;
  height: 30px;
  background-color: cyan;
}
</style>
