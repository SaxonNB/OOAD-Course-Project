<template>
  <div class="total">
    <div class="log">
      <MyHeader/>
    </div>
    <div class="goods-container">
      <div class="goods-box" v-for="dish in hotDishes" :key="dish.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="dish.photos[0].path" alt="Image" width="230px" height="230px"/>
          <div style="padding: 0 0.5em 0.5em 0.5em">
            <h3 class="goods-name">{{ dish.name }}</h3>
            <span class="goods-quantity">库存：{{ dish.quantity }}</span>
            <h3 class="goods-price">￥{{ dish.price }}</h3>
            <div class="goods-button-div">
              <el-button v-if="dish.quantity === 0" type="primary" disabled="disabled">加入购物车</el-button>
                <el-button v-if="dish.quantity !== 0 && (amounts[dish.id] == null || amounts[dish.id] === 0)"
                           type="primary" @click="setCart(dish.id, 1)">加入购物车</el-button>
                <el-input-number v-if="dish.quantity !== 0 && amounts[dish.id] !== 0 && amounts[dish.id] != null"
                                 v-model="amounts[dish.id]" @change="handleChange(dish.id)" :min="0" :max=dish.quantity>
                </el-input-number>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="cart-button-div">
      <el-badge :value="totalAmount">
        <el-button class="cart-button" icon="el-icon-shopping-cart-1" circle
                   @click="cartVisible = true">
        </el-button>
      </el-badge>
    </div>
    <el-drawer
        title="购物车"
        :visible.sync="cartVisible"
        custom-class="cart-drawer"
        direction="rtl"
        size="600px"
        @open="updateCartContent">
    <ShoppingList :cartContent=cartContent></ShoppingList>
    <div class="cart-drawer__footer">
      <el-container>
        <el-aside style="text-align: left;">
          <h2 style="margin: 1em;">总价:<span class="total-price">￥{{totalPrice}}</span></h2>
        </el-aside>
        <el-main style="text-align: right;">
          <el-button @click="cartVisible = false">取消</el-button>
          <el-button @click="createOrder" type="primary" :disabled="cartContent.length === 0">提交订单</el-button>
        </el-main>
      </el-container>
    </div>
    </el-drawer>
  </div>
</template>
<script>
import {buyGoodsApi, getAvailableFoodApi} from "@/api/goods";
import {getCarts, getCart, setCart, saveCarts} from "@/api/shoppingCart";
import MyHeader from "@/components/welcomeComponents/MyHeader.vue";
import {ref} from "vue";
import ShoppingList from "@/components/welcomeComponents/ShoppingList.vue";

export default {
  name: "RestaurantReservation",
  components: {ShoppingList, MyHeader},
  data() {
    return {
      cartVisible: false,
      hotDishes: [],
      amounts: ref(getCart(getCarts(), 1)),
      totalAmount: ref(0),
      cartContent: [],
      totalPrice: 0
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
    async fetchData() {
      const result = await getAvailableFoodApi();
      this.hotDishes = result.data;
      this.updateCart();
      this.updateTotalAmount();
    },
    updateCart() {
      const dishesMap = {};
      for (const idx in this.hotDishes) {
        const dish = this.hotDishes[idx];
        dishesMap[dish.id] = dish;
      }
      console.log(this.amounts);
      for (const idx in this.amounts) {
        const dish = dishesMap[idx];
        if (dish == null) {
          this.setCart(idx, 0);
          delete this.amounts[idx];
        } else if (this.amounts[dish.id] > dish.quantity) {
          this.amounts[dish.id] = dish.quantity;
          this.setCart(dish.id, dish.quantity);
        }
      }
    },
    updateTotalAmount() {
      this.totalAmount = 0;
      for (const goodsId in this.amounts) {
        this.totalAmount += parseInt(this.amounts[goodsId]);
      }
    },
    setCart(goodsId, amount) {
      this.amounts[goodsId] = amount;
      this.updateTotalAmount();
      setCart(1, goodsId, amount);
    },
    handleChange(goodsId) {
      this.updateTotalAmount();
      setCart(1, goodsId, this.amounts[goodsId]);
    },
    updateCartContent() {
      const cart = getCart(getCarts(), 1);
      this.cartContent = [];
      this.totalPrice = 0;
      for (const id in this.hotDishes) {
        const goods = this.hotDishes[id];
        if (cart[goods.id] != null && cart[goods.id] !== 0) {
          if (goods.quantity < cart[goods.id]) {
            cart[goods.id] = goods.amount;
          }
          goods.amount = cart[goods.id];
          this.cartContent.push(goods);
          this.totalPrice += goods.amount * goods.price;
        }
      }
    },
    async createOrder() {
      const goodsList = [];
      for (const id in this.cartContent) {
        const item = this.cartContent[id];
        goodsList.push({
          "goodsId": item.id,
          "amount": item.amount
        });
      }
      let result;
      try {
        result = (await buyGoodsApi(goodsList)).data;
      } catch (e) {
        this.$message.error('订单创建失败！');
        return;
      }
      if (result === 'Creation succeed.') {
        this.$message.success('订单创建成功！');
        const carts = getCarts();
        carts[1] = null;
        saveCarts(carts);
        window.location.reload();
      } else {
        this.$message.error(result);
      }
    }
  }
};
</script>
<style scoped>
.goods-container {
  max-width: 1350px;
  text-align: center;
  margin: 80px auto auto;
}
.goods-box {
  //box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 230px;
  display: inline-block;
  margin: 10px;
  text-align: left;
}
.goods-name {
  margin: 0.5em 0 0.5em 0;
}
.goods-price {
  margin: 0.5em 0 0.5em 0;
  color: #ff7b31;
}
.goods-quantity {
  float: right;
  color: #6f6f6f;
  margin-top: 0.1em;
}
.goods-button-div {
  text-align: center;
  height: 40px;
}
.cart-button {
  font-size: 35px;
}
.cart-button-div {
  position: fixed;
  right: 70px;
  bottom: 70px;
}
.total-price {
  color: #ff7b31;
}
</style>
