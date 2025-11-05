/**
 * 吊车控制
 */
class S_CraneControl {
    constructor({ viewer, modelPosition, modelPath }) {
        this.viewer = viewer;
        this.modelPath = modelPath;
        this.modelPosition = modelPosition;
        this.DCModel = null;

        this.pitchDegree = 0;//抬臂角度
        this.headingDegree = 0;//旋转吊车
        this.stretchNum = 0;//伸缩吊臂

        this._init()
    }

    _init() {
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
        const modelPosition = Cesium.Cartesian3.fromDegrees(this.modelPosition.y, this.modelPosition.x, this.modelPosition.z + 3); // 模型位置（经度，纬度，海拔）
        this.DCModel = this.viewer.scene.primitives.add(Cesium.Model.fromGltf({//设置吊车模型位置
            url: this.modelPath,
            minimumPixelSize: 200,
            maximumScale: 1,
            scale: 1,
            modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(modelPosition),
        }))
    }
    /**
     * 抬起吊臂
     *
     * @param {Number} value
     * value输入吊臂的弧度
     */
    raiseArm(value) {
        const armNode = this.DCModel.getNode('boom');
        if (armNode) {
            var heading = Cesium.Math.toRadians(90);
            var pitch = Cesium.Math.toRadians(this.headingDegree);
            var roll = Cesium.Math.toRadians(value)
            var headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);

            let headingPitchRollToFrame = Cesium.Transforms.headingPitchRollToFixedFrame(
                new Cesium.Cartesian3(0, 0, 0), // 使用初始矩阵
                headingPitchRoll,
                Cesium.Ellipsoid.WGS84, Cesium.Transforms.eastNorthUpToFixedFrame, armNode.matrix
            );

            armNode.matrix = headingPitchRollToFrame;
            this.originalArmMatrix = Cesium.Matrix4.clone(armNode.matrix);
        }
        this.pitchDegree = value;
    }
    /**
     * 旋转吊臂
     * @param {Number} value
     * value旋转的弧度
     */
    turnBack(value) {
        const armNode = this.DCModel.getNode('boom');

        if (armNode) {
            var heading = Cesium.Math.toRadians(90);
            var pitch = Cesium.Math.toRadians(value);
            var roll = Cesium.Math.toRadians(this.pitchDegree)
            var headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);
            let headingPitchRollToFrame = Cesium.Transforms.headingPitchRollToFixedFrame(
                new Cesium.Cartesian3(0, 0, 0), // 使用初始矩阵
                headingPitchRoll,
                Cesium.Ellipsoid.WGS84, Cesium.Transforms.eastNorthUpToFixedFrame, armNode.matrix
            );
            armNode.matrix = headingPitchRollToFrame;

        }

        const caokong = this.DCModel.getNode('cab');
        if (caokong) {
            // 同样处理其他节点
            var heading = Cesium.Math.toRadians(90);
            var pitch = Cesium.Math.toRadians(value);
            var roll = Cesium.Math.toRadians(0)
            var headingPitchRoll = new Cesium.HeadingPitchRoll(heading, pitch, roll);
            caokong.matrix = Cesium.Transforms.headingPitchRollToFixedFrame(
                new Cesium.Cartesian3(0, 0, 0), // 使用初始矩阵
                headingPitchRoll,
                Cesium.Ellipsoid.WGS84, Cesium.Transforms.eastNorthUpToFixedFrame, caokong.matrix
            );
        }
        this.originalArmMatrix = Cesium.Matrix4.clone(armNode.matrix);

        this.headingDegree = value;
    }

    /**
     * 伸缩吊臂
     * @param {Number} delta
     * 伸缩吊臂的长度 一共两节吊臂，超出6米伸出第二节
     */

    telescopic(delta) {

        let delta0 = 0;
        let delta4 = 0;

        delta0 = this._setValueWithMax(delta, 6)
        delta4 = delta - delta0

        const joint = this.DCModel.getNode('boom6');

        if (!this.originjointMatrix) {
            this.originjointMatrix = Cesium.Matrix4.clone(joint.matrix);
        }

        if (joint) {
            const extensionVector = new Cesium.Cartesian3(0, 0, -delta0);
            // 沿 Z 方向拉长
            joint.matrix = Cesium.Matrix4.multiplyByTranslation(this.originjointMatrix, extensionVector, new Cesium.Matrix4());
        }


        const joint4 = this.DCModel.getNode('boom4');

        if (!this.originjoint4Matrix) {
            this.originjoint4Matrix = Cesium.Matrix4.clone(joint4.matrix);
        }

        if (joint4) {
            const extensionVector = new Cesium.Cartesian3(0, 0, -delta4);
            // 沿 Z 方向拉长
            joint4.matrix = Cesium.Matrix4.multiplyByTranslation(this.originjoint4Matrix, extensionVector, new Cesium.Matrix4());

        }


    }
    _setValueWithMax(value, maxValue) {
        if (value > maxValue) {
            return maxValue;
        }
        return value;
    }
}