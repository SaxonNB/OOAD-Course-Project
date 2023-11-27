<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
/* global AMap */
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
  name: "SustechMap",
  data() {
    return {
      map: null,
      infoWindow: null,
      markers: [], // 存储标记点的数组
    }
  },
  methods: {
    async getBuildingDataFromServer() {
      // 从服务器获取建筑物信息的异步函数
      try {
        // const response = await this.axios.get('https://your-api-endpoint/buildings');
        // const buildingData = response.data;
        // 假设从服务器获取的数据格式如下，包含建筑物的id、名称和坐标信息
        const buildingData = [
          { id: 1, name: 'Building 1', location: [114.005, 22.597] },
          { id: 2, name: 'Building 2', location: [113.990, 22.595] },
          // ... 其他建筑物信息
        ];

        // 在获取数据后，调用方法在地图上标点
        this.addMarkers(buildingData);
      } catch (error) {
        console.error("Failed to get building data from the server:", error);
      }
    },
    addMarkers(buildingData) {
      // 根据建筑物信息在地图上添加标记点
      buildingData.forEach((building) => {
        const marker = new AMap.Marker({
          position: building.location,
          map: this.map,
          title: building.name,
          clickable: true,
        });

        // 监听标记点击事件
        AMap.event.addListener(marker, 'click', () => {
          // 获取标记位置的经纬度
          const lnglat = marker.getPosition();

          // 在信息窗体中显示信息
          this.infoWindow.setContent(`<div>${building.name}</div>`);
          this.infoWindow.open(this.map, lnglat);
        });

        // 将标记点添加到 markers 数组中
        this.markers.push(marker);
      });
    },
    initMap() {
      AMapLoader.load({
        key: "68343ff89a954b6f4777525d419b5300",
      }).then((AMap) => {
        this.map = new AMap.Map("container", {
          viewMode: "3D",
          expandZoomRange: true,
          zoom: 15.6,
          zooms: [15.6, 20],
          zoomEnable: true,
          center: [114.0036, 22.600946],
        });

        // 设置地图的显示范围
        this.map.setLimitBounds(new AMap.Bounds(
            [113.987431, 22.591298],  // 左下角经纬度
            [114.014951, 22.608553]   // 右上角经纬度
        ));

        // 创建信息窗体
        this.infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
        });

        // 从服务器获取建筑物信息并在地图上标点
        this.getBuildingDataFromServer();
      }).catch(e => {
        console.log(e);
      });
    },
  },
  created() {
    // 在 created 钩子中初始化地图
    this.initMap();
  },
}
</script>
<style>
#container {
  width: 80%;
  height: 800px;
  margin: 100px auto;
  border: 1px solid red;
  overflow: hidden;
}
</style>

