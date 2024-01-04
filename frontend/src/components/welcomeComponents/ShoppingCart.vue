<template>
  <el-table :data="cartContent" :height="tableHeight">
    <el-table-column align="center" fixed="left" width="400px">
      <template #header>商品</template>
      <template #default="scope">
        <el-container>
          <el-aside width="120px">
            <img :src="scope.row.photos[0].path" height="100px" width="100px"/>
          </el-aside>
          <el-main class="goods-box">
            <h3 class="goods-name">{{scope.row.name}}</h3>
            <h3 class="goods-price">{{ '￥' + scope.row.price }}</h3>
          </el-main>
        </el-container>
      </template>
    </el-table-column>
    <el-table-column align="center" width="100px">
      <template #header>数量</template>
      <template #default="scope">
        <h3>{{scope.row.amount}}</h3>
      </template>
    </el-table-column>
    <el-table-column align="center" fixed="right" width="100px">
      <template #header>小计</template>
      <template #default="scope">
        <h3 class="goods-price">{{ '￥' + (scope.row.price * scope.row.amount) }}</h3>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>

export default {
  name:"ShoppingList",
  data(){
    return {
      tableHeight: window.innerHeight - 180
    }
  },
  props: {
    cartContent: {
      type: Array,
      required: true
    }
  },
  mounted() {
  },
  methods: {

  },
};
</script>
<style scoped>
.goods-box {
  padding: 5px;
  text-align: left;
}
.goods-name {
  margin: 1em;
}
.goods-price {
  margin: 1em;
  color: #ff7b31;
}
</style>