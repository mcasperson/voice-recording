import './App.css';
import {ReactMediaRecorder} from "react-media-recorder";
import Button from '@mui/material/Button';

const readyToRecordStates = ["stopped", "idle"];
const recordingStates = ["recording"];

function App() {
    return (
        <div className="App">
            <h1>Universal Translator</h1>
            <ReactMediaRecorder
                audio
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div>
                        <p>
                            <Button onClick={startRecording} disabled={readyToRecordStates.indexOf(status) === -1}>
                                Start Recording
                            </Button>
                            <Button onClick={stopRecording} disabled={recordingStates.indexOf(status) === -1}>
                                Stop Recording
                            </Button>
                        </p>
                        <p>
                            <audio src={mediaBlobUrl} controls/>
                        </p>
                    </div>
                )}
            />
        </div>
    );
}

export default App;
