<template>
  <div>
    <div class="order-container">
      <div style="width: 410px; margin: auto;">
        <el-input
            placeholder="搜索订单商品"
            prefix-icon="el-icon-search"
            v-model="searchInput"
            @input="handleSearchChange"
            style="width: 250px; margin-right: 10px"
            clearable>
        </el-input>
        <el-select clearable v-model="searchSelect" placeholder="订单状态" @change="handleSearchChange" style="width: 150px">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="order-box" v-for="order in currentTableData" :key="order.id">
        <el-card>
          <div slot="header" class="clearfix" style="text-align: left">
            <span>订单{{order.id}}</span>
            <span style="float: right; text-align: right">创建时间：{{order.stringTime}}</span>
          </div>
          <el-container>
            <el-aside style="width: 90%; display: flex">
              <div v-for="goods in order.items" :key="goods.goodsId" class="order-goods-box">
                <div>
                  <img :src="goods.photo[0].path" class="order-goods-image"/>
                </div>
                <div style="width: 120px; vertical-align: center">
                  <h3 class="order-goods-name">{{goods.goodsName}}</h3>
                  <p class="order-goods-amount">{{'x' + goods.amount}}</p>
                  <h3 class="order-goods-price">{{'￥' + (goods.price * goods.amount)}}</h3>
                </div>
              </div>
            </el-aside>
            <el-main>
              <h2 class="order-goods-price">{{'￥' + order.totalPrice}}</h2>
              <p class="order-goods-amount">共{{order.totalAmount}}件</p>
              <el-button type="warning" size="small" v-if="order.status === 'WAITING_PAYMENT'"
                         @click="cancelOrder(order.id)">取消订单</el-button>
              <el-button size="small" v-else-if="order.status === 'FINISHED'" disabled>已完成</el-button>
              <el-button size="small" v-else-if="order.status === 'CANCELLED'" disabled>已取消</el-button>
            </el-main>
          </el-container>
        </el-card>
      </div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="validOrders.length"
      />
    </div>
  </div>
</template>
<script>
import {getAllGoodsApi, cancelOrderApi, getOrdersApi} from "@/api/goods";

export default {
  name:"foodRecord",
  data() {
    return {
      orders: [],
      validOrders: [],
      goodsPhoto: {},
      pageSize: 10,
      currentPage: 1,
      searchInput: '',
      searchSelect: '',
      options: [{
        value: 'WAITING_PAYMENT',
        label: '进行中'
      }, {
        value: 'FINISHED',
        label: '已完成'
      }, {
        value: 'CANCELLED',
        label: '已取消'
      }],

    };
  },
  props: {
    storeId: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    currentTableData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.validOrders.slice(start, end);
    },
  },
  methods: {
    async fetchData() {
      const goodsList = (await getAllGoodsApi(this.storeId)).data;
      for (const id in goodsList) {
        const goods = goodsList[id];
        this.goodsPhoto[goods.id] = goods.photos;
      }
      this.orders = (await getOrdersApi(this.storeId)).data;
      for (const orderId in this.orders) {
        const order = this.orders[orderId];
        order.totalAmount = 0;
        for (const itemId in order.items) {
          const item = order.items[itemId];
          item.photo = this.goodsPhoto[item.goodsId];
          order.totalAmount += item.amount;
        }
      }
      this.validOrders = this.orders;
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
    },
    handleSearchChange() {
      this.validOrders = [];
      for (const orderId in this.orders) {
        const order = this.orders[orderId];
        if (this.searchSelect !== '' && order.status !== this.searchSelect) {
          continue;
        }
        let flag = false;
        for (const itemId in order.items) {
          const item = order.items[itemId];
          if (this.searchInput === '' || item.goodsName.search(this.searchInput) !== -1) {
            flag = true;
            break;
          }
        }
        if (flag) {
          this.validOrders.push(order);
        }
      }
      this.currentPage = 1;
    },
    async cancelOrder(orderId) {
      let result;
      try {
        result = (await cancelOrderApi(orderId)).data;
      } catch (e) {
        this.$message.error('无法取消订单！');
        return;
      }
      if (result === 'success') {
        this.$message.success('订单取消成功！');
        setTimeout(
            () => window.location.reload(),
            1000
        )
      } else {
        this.$message.error(result);
      }
    }
  },
};
</script>
<style scoped>
.order-container {
  max-width: 1350px;
  margin: 80px auto auto;
}
.order-box {
  margin: 20px;
}
.order-goods-box {
  margin: 5px;
  display: flex;
}
.order-goods-image {
  margin: 5px;
  height: 100px;
  width: 100px;
}
.order-goods-name {
  text-align: left;
  margin: 0.5em;
}
.order-goods-amount {
  margin: 0.5em;
  text-align: right
 }
.order-goods-price {
  margin: 0.5em;
  color: #ff7b31;
  text-align: right
}
</style>