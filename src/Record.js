import * as React from "react";
import {ReactMediaRecorder} from "react-media-recorder";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";

const readyToRecordStates = ["stopped", "idle"];
const recordingStates = ["recording"];
const recordedStates = ["stopped"];

export const Record = (params) => {
    return (
        <div>
            <ReactMediaRecorder
                audio
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <Grid
                        container
                        spacing={2}
                        rowGap={2}
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12}>
                            <h3>Record your message</h3>
                        </Grid>

                        <Grid item md={3} xs={0}/>
                        <Grid item md={3} xs={12}>
                            <Button
                                variant="contained"
                                className={"fullWidth"}
                                onClick={startRecording}
                                disabled={readyToRecordStates.indexOf(status) === -1}>
                                Start Recording
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Button
                                variant="contained"
                                className={"fullWidth"}
                                onClick={stopRecording}
                                disabled={recordingStates.indexOf(status) === -1}>
                                Stop Recording
                            </Button>
                        </Grid>
                        <Grid item md={3} xs={0}/>
                        <Grid item xs={12}>
                            <audio src={mediaBlobUrl} controls/>
                        </Grid>
                        <Grid item md={3} xs={0}/>
                        <Grid item md={3} xs={12}>
                            <Button
                                variant="contained"
                                className={"fullWidth"}
                                onClick={()=>params.nextStep()}
                                disabled={recordedStates.indexOf(status) === -1}>
                                Transcribe >
                            </Button>
                        </Grid>
                    </Grid>)}
            />
        </div>
    )
}