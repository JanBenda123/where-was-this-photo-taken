import * as tf from '@tensorflow/tfjs'
import { ImageCoord } from 'src/types';


export class LocalizationModel{
    private translation: tf.Variable;
    private thetaX: tf.Variable;
    private thetaY: tf.Variable;
    private thetaZ: tf.Variable;

    private camCenterZ: tf.Variable;

    private imageCenter: tf.Tensor;

    private distanceNormalizer: tf.Tensor;
    private pixNormalizer: tf.Tensor;

    constructor(imageRes: ImageCoord){
        this.translation = tf.variable(tf.tensor1d([1.0, 1.0, 0.0]));
        this.thetaX = tf.variable(tf.scalar(0.0));
        this.thetaY = tf.variable(tf.scalar(0.0));
        this.thetaZ = tf.variable(tf.scalar(0.0));

        this.camCenterZ = tf.variable(tf.scalar(1));

        this.pixNormalizer = tf.tensor((imageRes.x+imageRes.y)/2);
        this.distanceNormalizer = tf.scalar(100);
        this.imageCenter = tf.tensor1d([imageRes.x / 2, imageRes.y / 2]);

        
    }

    /**
     * Creates 3x3 rotaion matrix
     * @param theta the amount to rotate in rads
     * @param axis specifies around which axis to rotate 
     * @returns 3x3 rotation matrix
     */
    private rotationMatrixFactory = (theta: tf.Tensor, axis: 'x' | 'y' | 'z'): tf.Tensor2D => {
        const cosT = tf.cos(theta);
        const sinT = tf.sin(theta);
        const negSinT = tf.neg(sinT);
        const tf0 = tf.scalar(0);
        const tf1 = tf.scalar(1);

        let row1: tf.Tensor1D;
        let row2: tf.Tensor1D;
        let row3: tf.Tensor1D;

        switch (axis) {
            case 'x':
            row1 = tf.stack([tf1, tf0, tf0]) as tf.Tensor1D;
            row2 = tf.stack([tf0, cosT, negSinT]) as tf.Tensor1D;
            row3 = tf.stack([tf0, sinT, cosT]) as tf.Tensor1D;
            break;
            case 'y':
            row1 = tf.stack([cosT, tf0, sinT]) as tf.Tensor1D;
            row2 = tf.stack([tf0, tf1, tf0]) as tf.Tensor1D;
            row3 = tf.stack([negSinT, tf0, cosT]) as tf.Tensor1D;
            break;
            case 'z':
            row1 = tf.stack([cosT, negSinT, tf0]) as tf.Tensor1D;
            row2 = tf.stack([sinT, cosT, tf0]) as tf.Tensor1D;
            row3 = tf.stack([tf0, tf0, tf1]) as tf.Tensor1D;
            break;
        }

        return tf.stack([row1, row2, row3]) as tf.Tensor2D;
    };


    public predict(inputPoints: tf.Tensor2D): tf.Tensor2D {
        const camToPoint = tf.sub(inputPoints.div(this.distanceNormalizer), this.translation);

        const Rx = this.rotationMatrixFactory(this.thetaX, 'x');
        const Ry = this.rotationMatrixFactory(this.thetaY, 'y');
        const Rz = this.rotationMatrixFactory(this.thetaZ, 'z');

        const R = Rz.matMul(Ry).matMul(Rx);

        const V = camToPoint.matMul(R.transpose());

        const Vxy = V.slice([0, 0], [-1, 2]);   // [BS, 2]
        const Vz = V.slice([0, 2], [-1, 1]);    // [BS, 1]

        const eps = 1e-6;
        const safeVz = tf.where(
            tf.greaterEqual(Vz, 0),
            tf.maximum(Vz, eps),
            tf.minimum(Vz, -eps)
        );

        let predPix = Vxy.div(safeVz).mul(this.camCenterZ) as tf.Tensor2D;

        predPix = predPix.mul(this.pixNormalizer)

        predPix = predPix.add(this.imageCenter);

        return predPix;
    }
    

    public getParams() {
        const rawTranslation = Array.from(this.translation.dataSync());
        const scale = this.distanceNormalizer.dataSync()[0];

        const [x, y, z] = rawTranslation.map(val => val * scale);
        const rx = this.thetaX.dataSync()[0];
        const ry = this.thetaY.dataSync()[0];
        const rz = this.thetaZ.dataSync()[0];

        return {
            translation: { x, y, z },
            rotation: {
                x: (rx * 180) / Math.PI,
                y: (ry * 180) / Math.PI,
                z: (rz * 180) / Math.PI,
            },
        };
    }

    public dispose(): void {
    this.translation.dispose();
    this.thetaX.dispose();
    this.thetaY.dispose();
    this.thetaZ.dispose();
    this.camCenterZ.dispose();
    this.imageCenter.dispose();
    this.distanceNormalizer.dispose();
    this.pixNormalizer.dispose();
  }
}