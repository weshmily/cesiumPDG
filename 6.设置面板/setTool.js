 class setTool {
     constructor(viewer) {
         this.viewer = viewer;
         this.viewer.scene.globe.depthTestAgainstTerrain = setConfig.S_DepthTestAgainstTerrain; //开启深度检测
         this.viewer.scene.globe.enableLighting = setConfig.S_EnableLighting; //开启光照
         this._initPointCloudVisibleHeight()
     }
     /**
      * 动态设置点云大小
      */
     setPointSize(value) {
         if (value) {
             setConfig.S_PointSize = value
         }
         let primitives = this.viewer.scene.primitives._primitives

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].style = new Cesium.Cesium3DTileStyle({ //点云大小
                 pointSize: value
             })
         }
     }
     /**
      * 动态设置点云内存限制
      */
     setMaximumMemoryUsage(value) {
         if (value) {
             setConfig.S_MaximumMemoryUsage = value
         }
         let primitives = this.viewer.scene.primitives._primitives

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].maximumMemoryUsage = value
         }
     }
     /**
      * 动态设置点云最大分辨率
      */
     setMaximumScreenSpaceError(value) {
         if (value) {
             setConfig.S_MaximumScreenSpaceError = value
         }
         let primitives = this.viewer.scene.primitives._primitives

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].maximumScreenSpaceError = value
         }
     }
     /**
      * 动态设置点云可视高度
      */
     setPointCloudVisibleHeight(value) {
         if (value) {
             setConfig.S_PointCloudVisibleHeight = value
         }
     }
     /**
      * 动态设置光照衰减
      */
     setAttenuation(value) {

         setConfig.S_Attenuation = value;

         let primitives = this.viewer.scene.primitives._primitives;

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].pointCloudShading.attenuation = value;
         }
     }
     /**
      * 动态设置衰减比例
      */
     setGeometricErrorScale(value) {
         if (value) {
             setConfig.S_GeometricErrorScale = value;
         }


         let primitives = this.viewer.scene.primitives._primitives;

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].pointCloudShading.GeometricErrorScale = value;
         }
     }
     /**
      * 动态设置最大衰减指数
      */
     setMaximumAttenuation(value) {
         if (value) {
             setConfig.S_MaximumAttenuation = value;
         }

         let primitives = this.viewer.scene.primitives._primitives;

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].pointCloudShading.maximumAttenuation = value;
         }
     }
     /**
      * 动态设置EDL
      */
     setEyeDomeLighting(value) {

         setConfig.S_EyeDomeLighting = value;

         let primitives = this.viewer.scene.primitives._primitives;

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].pointCloudShading.eyeDomeLighting = value;
         }
     }
     /**
      * 动态设置EDL的光照强度
      */
     setEyeDomeLightingStrength(value) {

         if (value) {
             setConfig.S_EyeDomeLightingStrength = value;
         }

         let primitives = this.viewer.scene.primitives._primitives;

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].pointCloudShading.eyeDomeLightingStrength = value;
         }
     }
     /**
      * 动态设置EDL的光照半径
      */
     setEyeDomeLightingRadius(value) {

         if (value) {
             setConfig.S_EyeDomeLightingRadius = value;
         }

         let primitives = this.viewer.scene.primitives._primitives;

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].pointCloudShading.eyeDomeLightingRadius = value;
         }
     }
     /**
      * 动态开启深度检测
      */
     setDepthTestAgainstTerrain(value) {
         setConfig.S_DepthTestAgainstTerrain = value;

         this.viewer.scene.globe.depthTestAgainstTerrain = value;

     }
     /**
      * 动态开启光照
      */
     setEnableLighting(value) {
         setConfig.S_EnableLighting = value;

         this.viewer.scene.globe.enableLighting = value;

     }
     /**
      * 预加载3Dtiles
      */
     setPreloadFlightDestinations(value) {

         setConfig.S_PreloadFlightDestinations = value;

         let primitives = this.viewer.scene.primitives._primitives;

         for (let i = 0; i < primitives.length; i++) {
             primitives[i].preloadFlightDestinations = value;
         }
     }

     _initPointCloudVisibleHeight() {
         let primitives = this.viewer.scene.primitives._primitives
         this.viewer.scene.camera.moveEnd.addEventListener(() => {
             //获取当前相机高度
             let height = this.viewer.camera.positionCartographic.height;

             if (height > setConfig.S_PointCloudVisibleHeight && open) {
                 open = false;
                 for (let i = 0; i < primitives.length; i++) {
                     primitives[i].style = new Cesium.Cesium3DTileStyle({
                         pointSize: setConfig.S_PointSize,
                         show: false
                     })
                 }
             } else if (height < setConfig.S_PointCloudVisibleHeight && !open) {
                 open = true;
                 for (let i = 0; i < primitives.length; i++) {
                     primitives[i].style = new Cesium.Cesium3DTileStyle({
                         pointSize: setConfig.S_PointSize,
                         show: true
                     })
                 }
             }
         })

         let open = false //显示隐藏开关变量
         let handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
         handler.setInputAction((wheelment) => {
             let height = this.viewer.camera.positionCartographic.height;
             if (height > setConfig.S_PointCloudVisibleHeight && open) {
                 open = false;
                 for (let i = 0; i < primitives.length; i++) {
                     primitives[i].style = new Cesium.Cesium3DTileStyle({
                         pointSize: setConfig.S_PointSize,
                         show: false
                     })
                 }
             } else if (height < setConfig.S_PointCloudVisibleHeight && !open) {
                 open = true;
                 for (let i = 0; i < primitives.length; i++) {
                     primitives[i].style = new Cesium.Cesium3DTileStyle({
                         pointSize: setConfig.S_PointSize,
                         show: true
                     })
                 }
             }
         }, Cesium.ScreenSpaceEventType.WHEEL);
     }

 }