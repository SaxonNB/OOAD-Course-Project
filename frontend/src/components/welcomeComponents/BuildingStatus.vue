<template>
 <div class="total">
   <div class="header">
    <el-container class="yy" >
      <el-header style="text-align: right" >
    <button @click="$router.push({path:'/user/login'})">用户登录</button>
      </el-header>
      <el-header style="text-align: right">
      <button @click="$router.push({path:'/manage'})">管理员界面</button>
      </el-header>
    </el-container>
     <h1 class="title1">南方科技大学校园建筑信息</h1>
  </div>
   <menu class="menu">
     <ul>
       <li><a href="/home">首页</a></li>
       <li><a href="/building">建筑信息</a></li>
       <li><a href="/user/login">评论区</a></li>
       <li><a href="/restaurant-reservation">线上食堂</a></li>
       <li><a href="/creative-products">南科文创</a></li>
       <li><a href="/restaurant-reservation/shoppingList">购物车</a></li>
     </ul>
   </menu>
<div class="buildingTable">
  <table>
    <thead>
    <tr>
      <th>建筑名称</th>
      <th>建筑图片</th>
      <th>建筑信息</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in tableData" :key="item.name">
      <td>{{ item.name }}</td>
      <td style="width: 60px">
        <img :src="item.picture" width="50" height="50"  alt="Picture"/>
      </td>
      <td>{{ item.information }}</td>
      <td>
        <input type="button" value="评论" @click="comment(this)">
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
</div>
</template>
<script>
//import RegisterForm from "@/components/welcomeComponents/RegisterForm.vue";
export default {
  name: "BuildingStatus",
  //components: {Buildings},
  data() {
    return {
      //表格数据
        tableData:[
          {name:'第一教学楼', picture: require('@/assets/yijiao.png'), information:'南方科技大学第一教学楼，毗邻南科大中心，共有5层，设备较老，是早期南科大主要的教学建筑，现随着教学重心转移到三教，风光不再，但保留着部分教学功能。'},
          {name:'第二教学楼', picture: require('@/assets/erjiao.png'), information:'南方科技大学第二教学楼，共有5层，以前主要为机房，现在随着机房搬至三教，人迹罕至。'},
          {name:'第三教学楼', picture: require('@/assets/yidan.png'), information:'南方科技大学第三教学楼，始建于2021年底，但仅仅用了不到一年就完成了修建，2022年秋投入使用，共有5层，其中第三层有观光的小平台，设备较新，是南科大最主要的教学楼，\n' +
                '            也是工作日人流量最大的地点，其中，各个机房便坐落于5楼。'},
          {name:'第一科研楼', picture: require('@/assets/yijiao.png'), information:'南方科技大学第一科研楼，共有5层，一层为一科报告厅，承包了多次大型讲座及活动，计算机系的部分理论课也在此地进行，2层以上为部分老师的科研实验室及办公室。'},
          {name:'南科大中心', picture: require('@/assets/nankedazhongxin.png'), information:'南方科技大学地标建筑之一，也是南科大人流活动的中心地带，主要用于举办活动和办公。'},
          {name:'理学院', picture: require('@/assets/lixueyuan.png'), information:'总共9层，规模宏大，设备崭新，2021年修建，2022年春季投入使用，主要用于理学院的老师及学生工作。'},
          {name:'工学院', picture: require('@/assets/gongxueyuan.jpg'), information:'总共9层，规模宏大，是南科大地标建筑之一，主要用于工学院的老师及学生工作，也是许多工科的实验室所在，大名鼎鼎的计算机系便坐落于此。'},
          {name:'商学院', picture: require('@/assets/shangxueyuan.jpg'), information:'总共5层，规模宏大，设备崭新，2021年修建，2022年春季投入使用，是部分课程的授课场所以及商学院、统计系的办公场所；更多的是，南科大学生的自习场所。'},
          {name:'人文社科学院', picture: require('@/assets/renwenshekexueyuan.png'), information:'坐落于三教与棒球场之间的偏僻山坡，是人文社科老师办公的场所，白天，小桥流水，十分幽静雅致；夜晚，则有一种诡异的寂静。'},
          {name:'一丹图书馆', picture: require('@/assets/yidan.png'), information:'坐落于南科大中心区域，为陈一丹先生投资所建，总共四层，是南科大唯一一座通宵开放的图书馆，也是南科大人流最大的图书馆， 卷王的聚集地，座位较为紧缺；同时，也承担部分展览活动。'},
        ],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      editDialogVisible: false,
      formData: {
        name: '',
        picture: '' ,
        information: '',
      },
      editFormData: {
        name: '',
        picture: '',
        information: '',
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
        picture: this.formData.picture,
        information: this.formData.information,
      });
      this.formData.name = '';
      this.formData.picture = '';
      this.formData.information = '';
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
        this.editFormData = { name: '', picture: '', information: '' };
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
    }
  },
};
</script>
<style scoped>
.total{
  background-image: url("@/assets/canteen.png");
  background-size: 100%;
}
.header{
  text-align: center;
  padding: 10px;
  height: 90px;
  margin-top: 0px;
  margin-bottom: 20px;
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
}
.yy{
  margin-bottom: 0;
  margin-inside: 0px;
  text-align: left;
  height: 0px;
}
.title1{
  color: #66ea0d;
  font-size: 60px;
  margin-top: 0px;
  margin-bottom: 0px;

}
.buildingTable{
  border: 20px #7ad6f5;
  border-collapse: separate;
  border-spacing: 1px;
  margin: 1px auto;
  //background-color: #19f9d7;
}
th {
  border: 1px solid black;
  padding: 15px;
  text-align: center;
  font-size: 15px;
  background-color: #dfaff9;
}
tr:nth-child(even){
  background-color: #dfaff9;
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
button{
  border-radius: 10px;
  font-size: 18px;
  color: deeppink;
  background-color: #f9f519;
}
</style>