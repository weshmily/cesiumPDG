/**
 * 测量线段
 */
 export class S_Measure {
    constructor(viewer) {
        this.viewer = viewer
        this.entityCollection = []
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
    }

    // var this.entityCollection = [];

    getCollection() {
        return this.entityCollection;
    };

    /**
     * 清除
     */
    destroy(callback) {
        for (var i = 0; i < this.entityCollection.length; i++) {
            this.viewer.entities.remove(this.entityCollection[i]);
        }
        this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        this.entityCollection = [];

        if (callback) {
            callback()
        }
    };

    /**
     * 测距
     */
    measurePolyLine(callback) {

        var positions = [];
        var labelEntity = null; // 标签实体

        // 注册鼠标左击事件
        this.viewer.screenSpaceEventHandler.setInputAction((clickEvent) => {
            var cartesian = this.viewer.scene.pickPosition(clickEvent.position); // 坐标
            // var cartesian = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);
            // 存储第一个点
            console.log(cartesian)
            if (!cartesian) {
                return false;
            }
            if (positions.length == 0) {
                positions.push(cartesian.clone());

                this.addPoint(cartesian);

                // 注册鼠标移动事件
                this.viewer.screenSpaceEventHandler.setInputAction((moveEvent) => {
                    var movePosition = this.viewer.scene.pickPosition(moveEvent.endPosition); // 鼠标移动的点
                    // var movePosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(moveEvent.endPosition), this.viewer.scene);


                    if (!movePosition) {
                        return false;
                    }
                    if (positions.length == 2) {
                        positions.pop();
                        positions.push(movePosition);

                        // 绘制label
                        if (labelEntity) {
                            this.viewer.entities.remove(labelEntity);
                            this.entityCollection.splice(this.entityCollection.indexOf(labelEntity), 1);
                        }

                        // 计算中点
                        var centerPoint = Cesium.Cartesian3.midpoint(positions[0], positions[1], new Cesium.Cartesian3());
                        // 计算距离
                        var lengthText = "距离：" + this.getLengthText(positions[0], positions[1]);

                        labelEntity = this.addLabel(centerPoint, lengthText);
                        this.entityCollection.push(labelEntity);

                    } else {
                        positions.push(movePosition);

                        // 绘制线
                        this.addLine(positions);
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            } else {
                // 存储第二个点
                positions.pop();
                positions.push(cartesian);
                this.addPoint(cartesian);
                this.addLine(positions);
                this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                if (callback) {
                    callback()
                }

            }


        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        // this.viewer.screenSpaceEventHandler.setInputAction((clickEvent) => {

        //     this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    };

    /**
     * 测面积
     */
    measurePolygon(callback) {

        var positions = [];
        var clickStatus = false;
        var labelEntity = null;
        this.viewer.scene.globe.depthTestAgainstTerrain = false;

        this.viewer.screenSpaceEventHandler.setInputAction((clickEvent) => {

            clickStatus = true;
            // var cartesian = this.viewer.scene.pickPosition(clickEvent.position);
            var cartesian = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);
            // console.log(cartesian);

            if (!cartesian) {
                return false
            }
            if (positions.length == 0) {
                positions.push(cartesian.clone()); //鼠标左击 添加第1个点
                this.addPoint(cartesian);

                this.viewer.screenSpaceEventHandler.setInputAction((moveEvent) => {
                    // var movePosition = this.viewer.scene.pickPosition(moveEvent.endPosition);
                    var movePosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(moveEvent.endPosition), this.viewer.scene);
                    // console.log(movePosition);
                    if (!movePosition) {
                        return false;
                    }
                    if (positions.length == 1) {
                        positions.push(movePosition);
                        this.addLine(positions);
                    } else {
                        if (clickStatus) {
                            positions.push(movePosition);
                        } else {
                            positions.pop();
                            positions.push(movePosition);
                        }
                    }

                    if (positions.length >= 3) {
                        // 绘制label
                        if (labelEntity) {
                            this.viewer.entities.remove(labelEntity);
                            this.entityCollection.splice(this.entityCollection.indexOf(labelEntity), 1);
                        }

                        var text = "面积：" + this.getArea(positions);
                        var centerPoint = this.getCenterOfGravityPoint(positions);
                        labelEntity = this.addLabel(centerPoint, text);

                        this.entityCollection.push(labelEntity);
                    }


                    clickStatus = false;
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


            } else if (positions.length == 2) {
                if (!cartesian) {
                    return false
                }
                positions.pop();
                positions.push(cartesian.clone()); // 鼠标左击 添加第2个点

                this.addPoint(cartesian);

                this.addPolyGon(positions);

                // 右击结束
                this.viewer.screenSpaceEventHandler.setInputAction((clickEvent) => {

                    // var clickPosition = this.viewer.scene.pickPosition(clickEvent.position);
                    var clickPosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);
                    // console.log(clickPosition);
                    if (!clickPosition) {
                        return false;
                    }
                    positions.pop();
                    positions.push(clickPosition);
                    positions.push(positions[0]); // 闭合
                    this.addPoint(clickPosition);

                    this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                    this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                    this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);


                    if (callback) {
                        callback()
                    }

                }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


            } else if (positions.length >= 3) {
                if (!cartesian) {
                    return false
                }
                positions.pop();
                positions.push(cartesian.clone()); // 鼠标左击 添加第3个点
                this.addPoint(cartesian);
            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    };

    /**
     * 测高
     */
    measureHeight(callback) {
        var positions = [];
        var labelEntity_1 = null; // 标签实体
        var labelEntity_2 = null; // 标签实体
        var labelEntity_3 = null; // 标签实体

        // 注册鼠标左击事件
        this.viewer.screenSpaceEventHandler.setInputAction((clickEvent) => {
            var cartesian = this.viewer.scene.pickPosition(clickEvent.position); // 坐标
            //var cartesian = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(clickEvent.position), this.viewer.scene);

            // 存储第一个点

            if (positions.length == 0) {
                if (!cartesian) {
                    return false
                }
                positions.push(cartesian.clone());
                this.addPoint(cartesian);

                // 注册鼠标移动事件
                this.viewer.screenSpaceEventHandler.setInputAction((moveEvent) => {
                    var movePosition = this.viewer.scene.pickPosition(moveEvent.endPosition); // 鼠标移动的点
                    //var movePosition = this.viewer.scene.globe.pick(this.viewer.camera.getPickRay(moveEvent.endPosition), this.viewer.scene);
                    if (!movePosition) {
                        return false
                    }
                    if (positions.length >= 2) {
                        positions.pop();
                        positions.pop();
                        positions.pop();

                        var cartographic = Cesium.Cartographic.fromCartesian(movePosition);
                        var height = Cesium.Cartographic.fromCartesian(positions[0]).height;

                        var verticalPoint = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), height);
                        positions.push(verticalPoint);
                        positions.push(movePosition);
                        positions.push(positions[0]);

                        // 绘制label
                        if (labelEntity_1) {
                            this.viewer.entities.remove(labelEntity_1);
                            this.entityCollection.splice(this.entityCollection.indexOf(labelEntity_1), 1);
                            this.viewer.entities.remove(labelEntity_2);
                            this.entityCollection.splice(this.entityCollection.indexOf(labelEntity_2), 1);
                            this.viewer.entities.remove(labelEntity_3);
                            this.entityCollection.splice(this.entityCollection.indexOf(labelEntity_3), 1);
                        }

                        // 计算中点
                        var centerPoint_1 = Cesium.Cartesian3.midpoint(positions[0], positions[1], new Cesium.Cartesian3());
                        // 计算距离
                        var lengthText_1 = "水平距离：" + this.getLengthText(positions[0], positions[1]);

                        labelEntity_1 = this.addLabel(centerPoint_1, lengthText_1);
                        this.entityCollection.push(labelEntity_1);

                        // 计算中点
                        var centerPoint_2 = Cesium.Cartesian3.midpoint(positions[1], positions[2], new Cesium.Cartesian3());
                        // 计算距离
                        var lengthText_2 = "垂直距离：" + this.getLengthText(positions[1], positions[2]);

                        labelEntity_2 = this.addLabel(centerPoint_2, lengthText_2);
                        this.entityCollection.push(labelEntity_2);

                        // 计算中点
                        var centerPoint_3 = Cesium.Cartesian3.midpoint(positions[2], positions[3], new Cesium.Cartesian3());
                        // 计算距离
                        var lengthText_3 = "直线距离：" + this.getLengthText(positions[2], positions[3]);

                        labelEntity_3 = this.addLabel(centerPoint_3, lengthText_3);
                        this.entityCollection.push(labelEntity_3);

                    } else {
                        var verticalPoint = new Cesium.Cartesian3(movePosition.x, movePosition.y, positions[0].z);
                        positions.push(verticalPoint);
                        positions.push(movePosition);
                        positions.push(positions[0]);
                        // 绘制线
                        this.addLine(positions);
                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            } else {
                // 存储第二个点
                positions.pop();
                positions.pop();
                positions.pop();
                var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                var height = Cesium.Cartographic.fromCartesian(positions[0]).height;

                var verticalPoint = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude), height);
                positions.push(verticalPoint);
                positions.push(cartesian);
                positions.push(positions[0]);
                this.addPoint(cartesian);
                this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                this.viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);

                if (callback) {
                    callback()
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    };

    /**
     * 添加点
     * @param position
     */
    addPoint(position) {
        console.log("position",position)
        this.entityCollection.push(this.viewer.entities.add(new Cesium.Entity({
            position: position,
            point: {
                color: Cesium.Color.BLUE,
                pixelSize: 5,
                heightReference: Cesium.HeightReference.NONE
            }
        })));
    };

    /**
     * 添加线
     * @param positions
     */
    addLine(positions) {
        var dynamicPositions = new Cesium.CallbackProperty(() => {
            return positions;
        }, false);
        this.entityCollection.push(this.viewer.entities.add(new Cesium.Entity({
            polyline: {
                positions: dynamicPositions,
                width: 2,
                arcType: Cesium.ArcType.RHUMB,
                clampToGround: false,
                material: Cesium.Color.RED, //获取或设置折线的表面外观
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,

            }
        })));
    };

    /**
     * 添加面
     * @param positions
     */
    addPolyGon(positions) {
        var dynamicPositions = new Cesium.CallbackProperty(() => {
            return new Cesium.PolygonHierarchy(positions);
        }, false);
        this.entityCollection.push(this.viewer.entities.add(new Cesium.Entity({
            polygon: {
                hierarchy: dynamicPositions,
                material: Cesium.Color.RED.withAlpha(0.6),
                classificationType: Cesium.ClassificationType.BOTH // 贴地表和贴模型,如果设置了，这不能使用挤出高度
            }
        })));
    };

    /**
     * 添加标签
     * @param position
     * @param text
     */
    addLabel(centerPoint, text) {
        return this.viewer.entities.add(new Cesium.Entity({
            position: centerPoint,
            label: {
                text: text,
                font: '14px sans-serif',
                style: Cesium.LabelStyle.FILL_AND_OUTLINE, //FILL  FILL_AND_OUTLINE OUTLINE
                fillColor: Cesium.Color.YELLOW,
                showBackground: true, //指定标签后面背景的可见性
                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8), // 背景颜色
                backgroundPadding: new Cesium.Cartesian2(6, 6), //指定以像素为单位的水平和垂直背景填充padding
                pixelOffset: new Cesium.Cartesian2(0, -25),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        }));
    };

    /**
     * 计算两点距离
     * @param firstPoint
     * @param secondPoint
     */
    getLengthText(firstPoint, secondPoint) {
        // 计算距离
        var length = Cesium.Cartesian3.distance(firstPoint, secondPoint);
        if (length > 1000) {
            length = (length / 1000).toFixed(2) + " 公里";
        } else {
            length = length.toFixed(2) + " 米";
        }
        return length;
    };

    getArea(points) {
        var ps = []
        for (var i = 0; i < points.length; i++) {
            var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(points[i]);
            var height = this.viewer.scene.globe.getHeight(cartographic);
            var point = Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180, height);
            ps.push(point)
        }
        var s = 0;
        for (var i = 0; i < ps.length; i++) {
            var p1 = ps[i];
            var p2;
            if (i < ps.length - 1)
                p2 = ps[i + 1];
            else
                p2 = ps[0];
            s += p1.x * p2.y - p2.x * p1.y;
        }
        var res

        if (s < 1000000) {
            res = Math.abs(s).toFixed(4) + " 平方米";
        } else {
            res = Math.abs((s / 1000000.0).toFixed(4)) + " 平方公里";
        }

        return res;
    }


    /**
     * 计算多边形的中心（简单的处理）
     * @param mPoints
     * @returns {*[]}
     */
    getCenterOfGravityPoint(mPoints) {
        var centerPoint = mPoints[0];
        for (var i = 1; i < mPoints.length; i++) {
            centerPoint = Cesium.Cartesian3.midpoint(centerPoint, mPoints[i], new Cesium.Cartesian3());
        }
        return centerPoint;
    }

}