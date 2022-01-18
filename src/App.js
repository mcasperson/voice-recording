import './App.css';
import {ReactMediaRecorder} from "react-media-recorder";

const readyToRecordStates = ["stopped", "idle"];
const recordingStates = ["recording"];

function App() {
    return (
        <div className="App">
            <h1>Universal Translator</h1>
            <ReactMediaRecorder
                video
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div>
                        <p>
                            <button onClick={startRecording} disabled={readyToRecordStates.indexOf(status) == -1}>Start
                                Recording
                            </button>
                            <button onClick={stopRecording} disabled={recordingStates.indexOf(status) == -1}>Stop
                                Recording
                            </button>
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
