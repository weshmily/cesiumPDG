const setConfig = {
    S_PointSize: 2,//点云大小[1-16]
    S_MaximumMemoryUsage: 512,//点云内存限制[128-1024]
    S_MaximumScreenSpaceError: 8,//最大分辨率[0-64]
    S_PointCloudVisibleHeight: 9600,//点云可视高度[4000-20000]
    S_Attenuation: true,//光照衰减
    S_GeometricErrorScale: 0.4,//衰减比例[0-2]
    S_MaximumAttenuation: 4,//最大衰减指数[0-32]
    S_EyeDomeLighting: true,//EDL
    S_EyeDomeLightingStrength: 0.4,//光照强度[0-10]
    S_EyeDomeLightingRadius: 1.4,//光照半径[0-10]
    S_DepthTestAgainstTerrain: false,//开启深度检测
    S_EnableLighting: false,//开启光照
    S_PreloadFlightDestinations: true//3Dtiles预加载
}
