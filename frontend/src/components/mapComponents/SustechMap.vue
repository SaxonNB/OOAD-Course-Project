<template>
  <div>
    <select v-model="selectedCategory" @change="updateMarkers">
      <option value="All">所有类别</option>
      <option value="CategoryA">类别A</option>
      <option value="CategoryB">类别B</option>
      <!-- 添加其他类别的选项 -->
    </select>
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
      markers: [],
      selectedCategory: 'All', // 默认显示所有类别
      buildingData: [], // Declare buildingData as a component data property
    }
  },
  methods: {
    async getBuildingDataFromServer() {
      try {
        // 从服务器获取建筑物信息的异步函数
        // 假设从服务器获取的数据格式如下，包含建筑物的id、名称、坐标、类别、简介和图片信息
        this.buildingData = [
          { id: 1, name: '建筑物1', location: [114.005, 22.597], category: 'CategoryA', introduction: '建筑物1的简介', image: 'url/to/image1.jpg' },
          { id: 2, name: '建筑物2', location: [113.990, 22.595], category: 'CategoryB', introduction: '建筑物2的简介', image: 'url/to/image2.jpg' },
          // ... 其他建筑物数据
        ];

        // 在获取数据后，调用方法在地图上标点
        this.addMarkers();
      } catch (error) {
        console.error("Failed to get building data from the server:", error);
      }
    },
    addMarkers() {
      this.map.clearMap()
      this.buildingData.forEach((building) => {
        if (this.selectedCategory === 'All' || building.category === this.selectedCategory) {
          const marker = new AMap.Marker({
            position: building.location,
            map: this.map,
            title: building.name,
            clickable: true,
          });

          AMap.event.addListener(marker, 'click', () => {
            const lnglat = marker.getPosition();

            // 在信息窗体中显示信息和详细信息的链接
            this.infoWindow.setContent(`
              <div>
                <h3>${building.name}</h3>
                <p>${building.introduction}</p>
                <img src="${building.image}" alt="${building.name}" style="max-width: 100%; height: auto;">
                <a href="javascript:void(0);" @click="showDetails(${building.id})">查看详细信息</a>
              </div>
            `);

            this.infoWindow.open(this.map, lnglat);
          });

          this.markers.push(marker);
        }
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

        this.map.setLimitBounds(new AMap.Bounds(
            [113.987431, 22.591298],  // 左下角经纬度
            [114.014951, 22.608553]   // 右上角经纬度
        ));

        this.infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
        });

        this.getBuildingDataFromServer();
      }).catch(e => {
        console.log(e);
      });
    },
    updateMarkers() {
      this.markers.forEach(marker => marker.setMap(null));
      this.markers = [];
      this.addMarkers();
    },
    showDetails(buildingId) {
      // 根据建筑物ID进行详细信息的导航
      this.$router.push({ path: `/building/${buildingId}` });
    },
  },
  created() {
    this.initMap();
  },
}
</script>

<style scoped>
#container {
  width: 80%;
  height: 800px;
  margin: 100px auto;
  border: 1px solid red;
  overflow: hidden;
}
</style>
