//搜索栏未完成，需要前后端连接
<template>
<div class="total">
  <div class="header">
    <el-container class="yy" >
      <el-header style="text-align: right" >
        <button @click="$router.push({path:'/home'})">退出登录</button>
      </el-header>
      <el-header style="text-align: right">
        <button @click="$router.push({path:'/manage'})">管理员界面</button>
      </el-header>
    </el-container>
    <h1 class="title1">校园建筑评论区</h1>
  </div>
  <div class="searchLine">
  <el-container class="xy">
    <el-header style="text-align: left">
      <input type="text" class="input" placeholder="请输入文字">
      <input type="button" value="搜索" class="search">
    </el-header>
  </el-container>
  </div>
  <div class="commentTable">
    <table>
      <thead>
      <tr>
        <th>用户</th>
        <th>建筑名称</th>
        <th>评论</th>
      </tr>
      </thead>
      <tbody id="tbody">
      <tr v-for="item in tableData" :key="item.name">
        <td id="id">{{item.id}}</td>
        <td id="name">{{ item.name }}</td>
        <td class="cc" id="comment">{{ item.comment }}</td>
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
  <div class="add" id="add">
    <h3 style="text-align: left; margin-top: 10px">写下你的评论吧！</h3>
    <form name="Add Comments">
      <label>
        <el-form-item v-model="formData.id"></el-form-item>
      </label>
      建筑
      <label class="building">
        <select name="building" v-model="formData.name" style="width: 100px;height: 25px" id="building">
          <option>第一教学楼</option>
          <option>第三教学楼</option>
          <option>一丹图书馆</option>
          <option>工学院</option>
        </select>
      </label>
      <br/>
      <br/>
      <label>
        <textarea rows="6"  v-model="formData.comment" placeholder="评论区还是一片荒地……" name="comments" id="comments" style="width: 1440px;height: 150px;text-align-all: left"/>
      </label>
      <br/>
      <input type="button" class="submit" value="提交"  id="submit" @click="handleAddConfirm">
      <input type="reset" class="cancel" id="reset" value="取消"><br>
      <br/>
    </form>
  </div>
</div>
</template>
<script>
export default {
  name: "CommentAreas",
  data() {
    return {
      tableData:[
        {name:'第一教学楼', comment:'我的英语课全是在这上的。',id:'12112222'},
        {name:'一丹图书馆', comment:'卷王聚集地，爱卷你就来。',id:'12222223'},
        {name:'一丹图书馆', comment:'把这当成宿舍。',id:'12222113'},
        {name:'第一教学楼', comment:'考试受难之地。',id:'12112912'},
        {name:'第一教学楼', comment:'教室充电器好少。',id:'12111112'},
        {name:'第三教学楼', comment:'设备崭新。',id:'122311113'},
        {name:'第三教学楼', comment:'还不错，就是电梯少了点。',id:'12112222'},
        {name:'商学院', comment:'永远没有多余的座位',id:'12312213'},
        {name:'理学院', comment:'学校门面。',id:'12110902'},
        {name:'一丹图书馆', comment:'离食堂很近。',id:'12211923'},
      ],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      editDialogVisible: false,
      formData: {
        id:'12112225',      //在已经登陆后，这里传入用户的id，未与其他板块链接，未实现
        name: '',
        comment: '' ,
      },
      editFormData: {
        id:'',
        name: '',
        comment: '',
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
    addRow() {
  let bodyObj = document.getElementById("tbody");
  if (!bodyObj) {
    alert("Body of Table not Exist!");
    return;
  }
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;
  let rowCount = bodyObj.rows.length;
  //let cellCount = bodyObj.rows[0].cells.length;
  bodyObj.style.display = ""; // display the tbody
      //let id="12112323";
      //let name = document.querySelector('form input[name="building"]').value;
      //let comment = document.querySelector('form input[name="comment"]').value;
  let newRow = bodyObj.insertRow(rowCount++);
  newRow.insertCell(0).innerHTML = id;
  newRow.insertCell(1).innerHTML = name;
  newRow.insertCell(2).innerHTML = comment;
  bodyObj.rows[0].style.display = "none";
  alert("New Row is Added");
},
    handleAddConfirm() {
      this.dialogVisible = true;
      this.tableData.push({
        id: this.formData.id,
        name: this.formData.name,
        comment: this.formData.comment,
      });
      this.formData.id = '12112225';    //在已经登陆后，这里传入用户的id，未与其他板块链接，未实现
      this.formData.name = '';
      this.formData.comment = '';
      this.dialogVisible = false;
    },

    comment(){
      this.$router.push({path:''})
    },
  },
};
</script>
<style scoped>
.total{
  //background-image: url("@/assets/canteen.png");
  background-color: lavenderblush;
}
.header{
  text-align: center;
  padding: 10px;
  height: 90px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.yy{
  margin-bottom: 0;
  margin-inside: 0px;
  text-align: left;
  height: 0px;
}
.xy{
  height: 40px;
  margin-left: 20px;
}
.input{
  height: 28px;
  float: left;
  outline: none;
  border: none;
  width: 250px;
}
.search{
  margin-left: 10px;
  height: 32px;
  background-color: #f9195c;
  color: white;
}
.title1{
  color: #7ad6f5;
  font-size: 60px;
  margin-top: 0px;
  margin-bottom: 0px;
}
.commentTable{
  border: 20px #7ad6f5;
  border-collapse: separate;
  border-spacing: 1px;
  margin: 1px auto;
}
th {
  border: 1px solid black;
  padding: 15px;
  text-align: center;
  font-size: 15px;
  background-color: #50ffca;
}
tr:nth-child(even){
  background-color: rgb(80, 255, 202);
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
.add{
  background-color: moccasin;
  line-height: 10px;
  width: 1450px;
  height: 300px;
  text-align: left;
  font-size: 20px;
  margin: 10px auto 0;
  border: 2px solid black;
}
.building{
  width: 100px;
}
.cc{
  width: 1210px;
  text-align: left;
}
.submit{
  margin-top: 10px;
  margin-left: 1290px;
  background-color: #00b2ff;
  width: 70px;
  height: 40px;
  text-align: center;
  border-radius: 10px;
}
.cancel{
  text-align: center;
  margin-left: 10px;
  width: 70px;
  height: 40px;
  background-color: magenta;
  border-radius: 10px;
}
</style>