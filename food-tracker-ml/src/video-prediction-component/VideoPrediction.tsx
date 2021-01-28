import React, { useEffect, useState } from 'react';
import ImageModel from '../helpers/ImageModel';

export interface IImageModelProps {
    signaturePath: string,
    videoElementToPredict: HTMLVideoElement | null
}
const VideoPrediction: React.FunctionComponent<IImageModelProps> = (props) => {
    const { signaturePath, videoElementToPredict } = props;
    const [model, setModel] = useState<ImageModel | undefined>(undefined);

    const loadModel = () => {
        if (!model) {
            const newModel = new ImageModel(signaturePath);
            newModel.load()
                .then(() => {
                    setModel(newModel);
                }).catch((err) => {
                    //TODO handle error
                    console.error("error loading model");
                    console.dir(err);
                }
                );
        }
    };

    const cleanUpModel = () => {
        if (model) {
            model.dispose();
            setModel(undefined);
        }
    };
    useEffect(() => {
        loadModel();
        return cleanUpModel;
    }, [signaturePath]);

    if (!model || !model.isLoaded()) {
        return (
            <h2>
                Model loading ...
            </h2>
        );
    }
    if(!videoElementToPredict){
        return (
            <h2>
                Video element not yet there.
            </h2>
        )
    }


    const predictVideo = () => {
        console.dir(model.predict(videoElementToPredict));
         // Call this function again to keep predicting when the browser is ready.
        //window.requestAnimationFrame(predictVideo);
    }

    videoElementToPredict.addEventListener('loadeddata', predictVideo);
    return (
        <p>Prediction running.</p>
    );


}

export default VideoPrediction;