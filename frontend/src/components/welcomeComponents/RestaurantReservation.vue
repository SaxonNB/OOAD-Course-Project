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
      <h1 class="title1">南方科技大学线上食堂</h1>
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
    <article>
      <div class="topic1">
        <div class="search">
          <input type="text"/>
          <input type="button" value="搜索"/>
        </div>
        <h1>热卖菜品</h1>
        <ul>
          <li>
            <a href="#"><img src="@/assets/xihongshichaodan.jpg" style="height: 180px"/></a>
            <span>5元</span>
            <h5>西红柿炒蛋</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/xiaochaorou.jpg" style="height: 180px"/></a>
            <span>10元</span>
            <h5>小炒肉</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/tangculiji.png" style="height: 180px"/></a>
            <span>5元</span>
            <h5>糖醋里脊</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/lujitui.jpg" style="height: 180px"/></a>
            <span>5元</span>
            <h5>卤鸡腿</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
        </ul>
      </div>
      <div class="topic2">
        <p></p>
        <h1>优惠菜品</h1>
        <ul>
          <li>
            <a href="#"><img src="@/assets/zhuroushuijiao.png" style="height: 180px"/></a>
            <span>10元</span>
            <h5>猪肉水饺（1份8个）</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/shanghaiqing.jpg" style="height: 180px"/></a>
            <span>3元</span>
            <h5>上海青</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/malatang.jpg" style="height: 180px"/></a>
            <span>20元</span>
            <h5>麻辣烫套餐</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/zhajiangmian.jpg" style="height: 180px"/></a>
            <span>8元</span>
            <h5>炸酱面</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
        </ul>
      </div>

      <div class="topic3">
        <p></p>
        <h1>美味甄选</h1>
        <div class="tishi">
        </div>
        <ul>
          <li>
            <a href="#"><img src="@/assets/dajipai.jpg" style="height: 180px"/></a>
            <span>5元</span>
            <h5>大鸡排</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/kaoyangpai.jpg" style="height: 180px"/></a>
            <span>5元</span>
            <h5>碳烤羊排</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/roumofentiao.jpg" style="height: 180px"/></a>
            <span>5元</span>
            <h5>肉末粉条</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
          <li>
            <a href="#"><img src="@/assets/chaonangua.jpg" style="height: 180px"/></a>
            <span>3元 </span>
            <h5>鲜炒南瓜</h5>
            <input type="button" value="加入购物车" @click="$router.push({path:'/restaurant-reservation/shoppingList'})">
          </li>
        </ul>
      </div>
    </article>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="TableData.length"
    />
  </div>
</template>
<script>
export default {
  //添加订单的部分没有写，在这里面点击“加入购物车”用于添加购物车商品
  name: "RestaurantReservation",
  data() {
    return {
      //表格数据
      TableData:[
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
  //background-image: url("@/assets/canteen.png");
  //background-size: 100%;
}
.header{
  //background-image: url("@/assets/xiaohuihuoju.png");
  //background-size: 100%;
}
.title1{
  color: #f9195c;
}
.menu{
  background-color: #f9f519;
}
.yy{
  height: 0;
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
span{
  word-break:normal;
  width:auto;
  display:block;
  white-space:pre-wrap;
  word-wrap : break-word ;
  overflow: hidden ;
}
</style>
