<template>
  <div>
    <div class="toggle-button" @click="toggleSidebar">
      <span v-if="showRouteSearch">隐藏侧边栏</span>
      <span v-else>显示侧边栏</span>
    </div>

    <div class="sidebar" :class="{ 'hidden': !showRouteSearch }">
      <div>
        <el-form>
          <el-form-item label="建筑物类型">
            <el-select v-model="selectedCategory" @change="updateMarkers" placeholder="请选择" class="custom-select">
              <el-option label="所有类别" value="All"></el-option>
              <el-option label="公交站" value="busStation"></el-option>
              <el-option label="教学楼" value="teachingBuilding"></el-option>
              <!-- 添加其他类别的选项 -->
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form>
          <el-form-item label="选择起始建筑物">
            <el-select v-model="startBuilding" placeholder="请选择">
              <el-option v-for="building in buildingData" :key="building.id" :label="building.name" :value="building.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择目标建筑物">
            <el-select v-model="targetBuilding" placeholder="请选择">
              <el-option v-for="building in buildingData" :key="building.id" :label="building.name" :value="building.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 100%; text-align: center; margin-top: 20px;">
            <el-switch v-model="searchType" active-text="Walk" inactive-text="Bus"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchRoutes">查询路线</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>

    <div id="container"></div>
  </div>
</template>

<script>
/* global AMap */
import AMapLoader from '@amap/amap-jsapi-loader'
window._AMapSecurityConfig = {
  securityJsCode: '3c9cf70ce0cf6f70861ad5b41e2e896d'
}
export default {
  name: "SustechMap",
  data() {
    return {
      map: null,
      infoWindow: null,
      markers: [],
      selectedCategory: 'All',
      buildingData: [],
      showRouteSearch: true,
      startBuilding: null,
      targetBuilding: null,
      searchType: false,
      walkingPath: null,
    };
  },
  methods: {

    async getBuildingDataFromServer() {
      // 从服务器获取建筑物信息的异步函数
      // 假设从服务器获取的数据格式如下，包含建筑物的id、名称、坐标、类别、简介和图片信息
      this.buildingData = [
        { id: 1, name: '一号门公交站', location: [113.999341, 22.593114], category: 'busStation', introduction: '建筑物1的简介', image: 'url/to/image1.jpg' },
        { id: 2, name: '专家公寓公交站', location: [114.003456, 22.598949], category: 'busStation', introduction: '建筑物2的简介', image: 'url/to/image2.jpg' },
        // ... 其他建筑物数据
      ];

      // 在获取数据后，调用方法在地图上标点
      this.addMarkers();
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
        key: "8bf3022e63d5048a188a8f99118336fa",
        plugins:['AMap.Walking']
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
            [113.999341, 22.593114],  // 左下角经纬度
            [114.003456, 22.598949]   // 右上角经纬度
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
    toggleSidebar() {
      // 切换侧边栏的显示状态
      this.showRouteSearch = !this.showRouteSearch;
    },
    findBuildingLocationById(buildingId) {
      const building = this.buildingData.find(b => b.id === buildingId);
      return building ? building.location : null;
    },
    // 在 methods 中添加 searchRoutes 方法
    async searchRoutes() {
      console.log(this.searchType)
      // 检查起始和目标建筑物是否已选择
      if (!this.startBuilding || !this.targetBuilding) {
        // 这里可以添加一些用户提示或者直接返回，视具体情况而定
        this.$message({
          message: '请选择出发点和目的地!',
          type: "error"
        });
        return;
      }

      // 构造请求参数
      const requestData = {
        startBuilding: this.startBuilding,
        targetBuilding: this.targetBuilding
      };

      console.log(requestData)
      console.log(this.startBuilding)
      console.log(this.targetBuilding)
      // let requestEndpoint = '';

      // 根据搜索类型选择不同的请求接口
      if (this.searchType) {
        console.log('walk search')
        // Retrieve the locations of start and target buildings
        const startLocation = this.findBuildingLocationById(this.startBuilding);
        const targetLocation = this.findBuildingLocationById(this.targetBuilding);

        if (!startLocation || !targetLocation) {
          // Handle the case where the building locations are not found
          console.error('Error: Building locations not found.');
          return;
        }

        console.log(this.searchType)
        console.log('Start Location:', startLocation);
        console.log('Target Location:', targetLocation);
        const walking = new AMap.Walking({
          map: this.map,
        });

        walking.search([113.999341, 22.593114], [114.003456, 22.598949], (status, result) => {
          if (status === 'complete' || result.info === 'OK') {
            // this.drawWalkingPath(result.routes[0].steps);
            console.log("绘制路线完成")
          } else {
            console.log(status)
            console.log(result)
            console.error('Error: Walking route planning failed.');
          }
        });
      } else {
        console.log('bus search')
        // requestEndpoint = '/searchBusRoutes';
        // // 向服务器发送请求
        // this.axios.post(requestEndpoint, requestData)
        //     .then(response => {
        //       // 处理服务器返回的数据，这里假设服务器返回的是一个有序列表
        //       const orderedBuildingList = response.data;
        //     })
        //     .catch(error => {
        //       console.error('Error searching routes:', error);
        //       // 这里可以添加一些错误处理逻辑，比如给用户提示
        //     });
      }


    },
  },
  created() {
    this.initMap();
  },
};
</script>

<style scoped>
#container {
  width: 100%;
  height: 900px;
  margin: 100px auto;
  overflow: hidden;
}

.sidebar {
  /* 侧边栏样式，可以根据需要添加样式 */
  width: 500px;
  height: 300px;
  position: fixed;
  top: 300px;
  right: 0;
  background-color: #fff;
  padding: 20px;
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border-radius: 30px;
  z-index: 1;
}

.hidden {
  transform: translateX(100%);
}

.toggle-button {
  position: fixed;
  top: 250px;
  right: 20px;
  cursor: pointer;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  z-index: 1;
}
.custom-select .el-input {
  width: 200px; /* 设置选择框的宽度 */
}

.custom-select .el-input__suffix {
  right: 10px; /* 调整箭头的位置 */
}

.custom-select .el-input__inner {
  padding: 10px; /* 调整内部输入框的内边距 */
  height: 40px; /* 设置输入框的高度 */
  border: 1px solid #ccc; /* 自定义边框样式 */
  border-radius: 5px; /* 设置边框圆角 */
}

.custom-select .el-select-dropdown {
  border-radius: 5px; /* 设置下拉框的圆角 */
}

.custom-select .el-select-dropdown__item {
  padding: 10px; /* 调整下拉选项的内边距 */
}

.custom-select .el-select-dropdown__item.hover {
  background-color: #f0f0f0; /* 设置鼠标悬停时的背景颜色 */
}
</style>
