<template>
  <div>
    <div ref="chart1" style="width: 50%; height: 400px; float: left;"></div>
    <div ref="chart2" style="width: 50%; height: 400px; float: left;"></div>
  </div>
</template>

<script>
import axios from "axios";
import echarts from "echarts";

export default {
  data() {
    return {
      salesData1: [],
      salesData2: [],
    };
  },
  mounted() {
    this.fetchSalesData("http://localhost:8082/order/statistics/1", 'chart1', '食堂统计表');
    this.fetchSalesData("http://localhost:8082/order/statistics/2", 'chart2', '文创商店统计表');
  },
  methods: {
    fetchSalesData(url, chartRef, chartTitle) {
      // 在请求头中添加 token
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'token': `${localStorage.getItem('admin_user_token')}`
        }
      }).then((response) => {
        // 根据传入的 chartRef 区分数据
        if (chartRef === 'chart1') {
          this.salesData1 = response.data;
          this.renderChart(this.salesData1, this.$refs.chart1, chartTitle);
        } else if (chartRef === 'chart2') {
          this.salesData2 = response.data;
          this.renderChart(this.salesData2, this.$refs.chart2, chartTitle);
        }
      }).catch((error) => {
        console.error("获取销售数据时发生错误：", error);
      });
    },
    renderChart(data, chartRef, chartTitle) {
      const chart = echarts.init(chartRef);

      const names = data.map((item) => item.name);
      const quantities = data.map((item) => item.quantity);

      const option = {
        title: {
          text: chartTitle, // 使用传入的标题
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: names,
        },
        yAxis: {
          type: "value",
          name: "销售数量",
        },
        series: [
          {
            name: "销售数量",
            type: "bar",
            data: quantities,
          },
        ],
      };

      chart.setOption(option);
    },
  },
};
</script>

<style scoped>
/* 在这里添加你的组件样式 */
</style>
