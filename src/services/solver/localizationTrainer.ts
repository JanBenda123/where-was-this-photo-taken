import * as tf from '@tensorflow/tfjs'

import { FlatImageCart } from "../servicesTypes";
import { LocalizationModel } from './localizationModel';


export class LocalizationTrainer{
    private xs: tf.Tensor2D;
    private ys:  tf.Tensor2D;
    private model: LocalizationModel;

    constructor(model: LocalizationModel, data: FlatImageCart){
        this.xs = tf.tensor(data.cart);
        this.ys =  tf.tensor(data.pix);
        this.model = model; 
    }

        public train(): void {
        const epochs = 1000;
        const learningRate = 0.001;
        const logEvery = 100;

        const optimizer = tf.train.sgd(learningRate);

        for (let epoch = 1; epoch <= epochs; epoch++) {
            const lossValue = optimizer.minimize(() => {
                const predictions = this.model.predict(this.xs);
                return tf.losses.meanSquaredError(this.ys, predictions) as tf.Scalar;
            }, true);

            if (epoch % logEvery === 0 || epoch === 1) {
                const lossVal = lossValue ? lossValue.dataSync()[0] : 0;
                const params = this.model.getParams();
                console.log(`Epoch ${epoch}/${epochs} | Loss: ${lossVal.toFixed(6)}`);
                console.log(`  Translation: [x: ${params.translation.x.toFixed(2)}, y: ${params.translation.y.toFixed(2)}, z: ${params.translation.z.toFixed(2)}]`);
                console.log(`  Rotation (deg): [x: ${params.rotation.x.toFixed(2)}, y: ${params.rotation.y.toFixed(2)}, z: ${params.rotation.z.toFixed(2)}]`);
            }

            if (lossValue) {
                lossValue.dispose();
            }
        }

        optimizer.dispose();
    }


    public dispose(): void {
        this.xs.dispose();
        this.ys.dispose();
        this.model.dispose();
    }
}