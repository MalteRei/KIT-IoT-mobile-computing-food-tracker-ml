import React, { useState } from "react";
import CameraFeed from "../camera-feed-component/CameraFeed";
import VideoPrediction from "../video-prediction-component/VideoPrediction";

const CameraStream: React.FunctionComponent = (props) => {

    const [cameraEnabled, setCameraEnabled] = useState(false);
    const [cameraStream, setCameraStream] = useState<MediaStream | undefined>(undefined);

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
        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            setCameraStream(stream);
            setCameraEnabled(true);
        });
    }


    if (cameraEnabled) {
        if(!cameraStream) {
            return(
                <p>Something went wrong with the camera.</p>
            );
        }
        return (
        <div>
            <p>Camera is enabled</p>
            <CameraFeed cameraStream={cameraStream}/>
            </div>);
    }

    if (getUserMediaSupported()) {
        return (<button onClick={enableCamera}>
            Enable Webcam
        </button>);
    }




    return (
        //TODO create own error component
        <h1>Camera is not supported by your browser</h1>
    );
}


export default CameraStream;