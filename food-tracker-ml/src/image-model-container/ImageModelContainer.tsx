import React, { useEffect, useState } from 'react';
import EndlessSpinner from '../endless-spinner-component/EndlessSpinner';
import ImageModel from '../helpers/ImageModel';
import Prompt from '../prompt-component/Prompt';
import VideoPrediction from '../video-prediction-component/VideoPrediction';

export interface IImageModelContainerProps {
    videoElementToPredict: HTMLVideoElement | undefined,
}
const ImageModelContainer: React.FunctionComponent<IImageModelContainerProps> = (props) => {
    const {videoElementToPredict} = props;
    const [model, setModel] = useState<ImageModel | undefined>(undefined);

    const loadModel = () => {
        if (!model) {
            const newModel = new ImageModel("https://foodtrackerstorage.z1.web.core.windows.net/model","signature.json");
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
    }, []);

    if (!model || !model.isLoaded()) {
        const descriptionElement = (
            <p>We need to download a machine learning model that can find food.
                <br></br>
                <EndlessSpinner/>
            </p>
        );
        return (
            <Prompt title="Loading Model" description={descriptionElement} />
        );
    }
    return(
        <VideoPrediction videoElementToPredict={videoElementToPredict} model={model}/>
    );

}
export default ImageModelContainer;