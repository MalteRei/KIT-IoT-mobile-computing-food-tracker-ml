import React, { useEffect, useState } from 'react';
import FoodPredictionResult from '../food-prediction-result-component/FoodPredictionResult';
import ImageModel from '../helpers/ImageModel';
import IPrediction from '../models/IPrediction';
import Prompt from '../prompt-component/Prompt';

export interface IImageModelProps {
    videoElementToPredict: HTMLVideoElement | undefined,
    model: ImageModel
}
const VideoPrediction: React.FunctionComponent<IImageModelProps> = (props) => {
    const { videoElementToPredict, model } = props;
    const [currentPrediction, setCurrentPrediction] = useState<IPrediction | undefined>(undefined);

   
   



   
    if(!videoElementToPredict){
        return (
            <h2>
                Video element not yet there.
            </h2>
        )
    }


    const predictVideo = () => {
       // console.log("predict video");
        if(videoElementToPredict) {
        const prediction = model.predictWithHighestConfidence(videoElementToPredict);
        if(prediction) {
            setCurrentPrediction(prediction);
        }
        //model.predict(videoElementToPredict)
         // Call this function again to keep predicting when the browser is ready.
        }
        window.requestAnimationFrame(predictVideo);
    }
    if(videoElementToPredict && !currentPrediction){
        predictVideo();

    }
    
    return (
        <FoodPredictionResult currentPrediction={currentPrediction}/>

    );


}

export default VideoPrediction;