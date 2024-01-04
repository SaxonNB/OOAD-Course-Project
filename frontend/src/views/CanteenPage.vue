<template>
  <div class="total">
    <div class="header">
      <MyHeader/>
    </div>
    <GoodsList :storeId=1 />
    <div class="footer">
      <MyFooter></MyFooter>
    </div>
  </div>
</template>

<script>
import MyFooter from "@/components/welcomeComponents/MyFooter.vue";
import MyHeader from "@/components/welcomeComponents/MyHeader.vue";
import GoodsList from "@/components/welcomeComponents/GoodsList.vue";
export default {
  name: "CanteenPage",
  components: {
    MyHeader,
    MyFooter,
    GoodsList
  }
}
</script>
