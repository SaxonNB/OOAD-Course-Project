<template>
  <div class="total">
    <div class="header">
      <MyHeader/>
    </div>
    <OrdersList :storeId=2 />
    <div class="footer">
      <MyFooter></MyFooter>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
import OrdersList from "@/components/welcomeComponents/OrdersList.vue";
import MyHeader from "@/components/welcomeComponents/MyHeader.vue";
import MyFooter from "@/components/welcomeComponents/MyFooter.vue";
</script>