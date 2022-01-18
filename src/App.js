import './App.css';
import {ReactMediaRecorder} from "react-media-recorder";
import Button from '@mui/material/Button';
import {Grid} from "@mui/material";

const readyToRecordStates = ["stopped", "idle"];
const recordingStates = ["recording"];

function App() {
    return (
        <div className="App">
            <h1>Universal Translator</h1>
            <ReactMediaRecorder
                audio
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        alignItems="center">
                        <Grid item md={3} xs={0}/>
                        <Grid item md={3} xs={12}>
                            <Button variant="contained" onClick={startRecording} disabled={readyToRecordStates.indexOf(status) === -1}>
                                Start Recording
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Button variant="contained" onClick={stopRecording} disabled={recordingStates.indexOf(status) === -1}>
                                Stop Recording
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={0}/>
                        <Grid item xs={12}>
                            <audio src={mediaBlobUrl} controls/>
                        </Grid>
                    </Grid>
                )}
            />
        </div>
    );
}

export default App;
