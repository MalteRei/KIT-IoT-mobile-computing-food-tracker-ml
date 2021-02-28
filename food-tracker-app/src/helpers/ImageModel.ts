import * as tf from '@tensorflow/tfjs';
import IPrediction from '../models/IPrediction';
//import { readFileSync } from 'fs';
class ImageModel {

    private baseUrl: string;
    private signatureFileName: string;
    private signature: any;
    private modelPath: string | undefined;
    private height: number | undefined;
    private width: number | undefined;
    private outputName: string | undefined;
    private outputKey = "Confidences";
    private classes: string[] | undefined;
    private model?: tf.GraphModel;

    public constructor(baseUrl: string, signatureFileName: string) {
        if(!baseUrl.endsWith("/")){
            this.baseUrl = baseUrl + "/";
        } else {
            this.baseUrl = baseUrl;
        }

        this.signatureFileName = signatureFileName;
    }

    public async load() {
        const signatureResponse = await fetch(this.baseUrl + this.signatureFileName);
        if(signatureResponse.ok){
            const signatureJson = await signatureResponse.json();
            this.signature = signatureJson;
            this.modelPath = this.baseUrl + this.signature.filename;
            [this.width, this.height] = this.signature.inputs.Image.shape.slice(1, 3);
            this.outputName = this.signature.outputs[this.outputKey].name;
            this.classes = this.signature.classes.Label;
            this.model = await  tf.loadGraphModel(this.modelPath);
        } else {
            throw Error("could not load model");
        }
       

    }

    public dispose(): void {
        if (this.model) {
            this.model.dispose();
            this.model = undefined;
        }
    }

    public isLoaded(): boolean {
        return (this.model !== undefined);
    }

    public predictWithHighestConfidence(toPredict: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement |
        HTMLVideoElement): IPrediction | undefined {
            if(!this.classes) {
                throw Error("classes for model not defined");
            }
            const result = this.predictWithTensorTranformation(toPredict);
            if(!result) {
                return undefined;
            }
            let max = 0;
            let maxIndex = 0;
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                if(element > max) {
                    max = element;
                    maxIndex = index;
                }
            }
            return {
                label: this.classes[maxIndex],
                confidence: max
            }

        }

    public predict(toPredict: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement |
        HTMLVideoElement) {
        const result = this.predictWithTensorTranformation(toPredict);
        if(result) {
            return {
            [this.outputKey]: this.classes?.map((classLabel, index) => ({
                label: classLabel,
                confidence: result[index]
            } as IPrediction))
            
           /* this.classes?.reduce(
                (acc, class_, idx) => {
                    return { [class_]: resultsArray[idx], ...acc }
                }, {}
            )*/
        }
        }
        return undefined;
        
    }

    private predictWithTensorTranformation(toPredict: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement |
        HTMLVideoElement) {
            const tensorToPredict = tf.tidy(() => {
                if (!(toPredict instanceof tf.Tensor)) {
                    return tf.browser.fromPixels(toPredict);
                } else {
                    return toPredict;
                }
            });
            const result = this.predictTensor(tensorToPredict);
            tensorToPredict.dispose();
            return result;
    }
    private predictTensor(image: tf.Tensor) {
        /*
        Given an input image decoded by tensorflow as a tensor,
        preprocess the image into pixel values of [0,1], center crop to a square
        and resize to the image input size, then run the prediction!
         */
        if (!!this.model && this.height && this.width) {
            const [imgHeight, imgWidth] = image.shape.slice(0, 2);
            // convert image to 0-1
            const normalizedImage = tf.div(image, tf.scalar(255));
            // make into a batch of 1 so it is shaped [1, height, width, 3]
            const reshapedImage: tf.Tensor4D = normalizedImage.reshape([1, ...normalizedImage.shape]);
            // center crop and resize
            let top = 0;
            let left = 0;
            let bottom = 1;
            let right = 1;
            if (imgHeight !== imgWidth) {
                // the crops are normalized 0-1 percentage of the image dimension
                const size = Math.min(imgHeight, imgWidth);
                left = (imgWidth - size) / 2 / imgWidth;
                top = (imgHeight - size) / 2 / imgHeight;
                right = (imgWidth + size) / 2 / imgWidth;
                bottom = (imgHeight + size) / 2 / imgHeight;
            }
            const croppedImage = tf.image.cropAndResize(
                reshapedImage, [[top, left, bottom, right]], [0], [this.height, this.width]
            );
            const results = this.model.execute(
                { [this.signature.inputs.Image.name]: croppedImage }, this.outputName
            ) as tf.Tensor;
            return results.dataSync();

            
        } /*else {
            console.error("Model not loaded, please await this.load() first.");
        }*/
    }
}

export default ImageModel;