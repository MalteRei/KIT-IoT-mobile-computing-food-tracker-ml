import React, { ReactElement, useState } from "react";
import './CameraStream.css'

import logo from '../assets/images/cartoon-camera-illustration_23-2147533355.jpg';
import Prompt from "../prompt-component/Prompt";


export interface ICameraStream {
    onCameraStreamEnabled: (cameraStream: MediaStream) => void
}
const CameraStream: React.FunctionComponent<ICameraStream> = (props) => {

    const { onCameraStreamEnabled, children } = props;
    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [cameraError, setCameraError] = useState<MediaStreamError | undefined>(undefined);



    // Check if webcam access is supported.
    const getUserMediaSupported = () => {
        return !!(navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia);
    }

    const enableCamera = () => {
        // getUsermedia parameters to force video but not audio.
        const constraints = {
            video: true
        };

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                onCameraStreamEnabled(stream);
                setCameraEnabled(true);
                setCameraError(undefined);
            }).catch((error: MediaStreamError) => {
                console.dir(error);
                setCameraEnabled(false);
                setCameraError(error)
            });
    }

    

    if (!cameraEnabled) {
        if (getUserMediaSupported()) {
            let descriptionParagraph = (
                <p>
                    The food tracker works by recognizing foods in the video stream you camera produces.
                <br />
                We do not store the video stream of your camera.
                <br />
                To recognize food in your camera stream we use an object classification model. The model is downloaded to your device. No data leaves your device.
                </p>
            );
            let buttonText = 'Enable Camera';

            if (cameraError) {
                descriptionParagraph = (
                        <p>
                            Something went wrong with the camera
                    </p>);
                    buttonText = 'Try again';
            }
            
            return (
                <Prompt onButtonClicked={enableCamera} buttonText={buttonText} imageUrl={logo} imageAlt="Illustration of a camera." title="Please enable your webcame to use the food tracker!" description={descriptionParagraph}/>
            );
        } else {




            return (
                //TODO create own error component
                <h3>Camera is not supported by your browser</h3>
            );
        }
    }

   return children as ReactElement<any, any>;

}


export default CameraStream;