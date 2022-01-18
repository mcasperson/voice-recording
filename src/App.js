import './App.css';
import {ReactMediaRecorder} from "react-media-recorder";
import Button from '@mui/material/Button';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

const readyToRecordStates = ["stopped", "idle"];
const recordingStates = ["recording"];

function App() {
    const [inputLanguage, setInputLanguage] = useState("English");
    const [translatedLanguage, setTranslatedLanguage] = useState("German");

    const handleInputLanguageChange = (event) => {
        setInputLanguage(event.target.value);
    };

    const handleTranslatedLanguageChange = (event) => {
        setTranslatedLanguage(event.target.value);
    };


    return (
        <div className="App">
            <h1>Universal Translator</h1>
            <ReactMediaRecorder
                audio
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <Grid
                        container
                        spacing={2}
                        rowGap={2}
                        justifyContent="center"
                        alignItems="center">
                        <Grid item md={3} xs={0}/>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="language-label">Recorded Language</InputLabel>
                                <Select
                                    labelId="language-label"
                                    value={inputLanguage}
                                    label="Recorded Language"
                                    onChange={handleInputLanguageChange}
                                >
                                    <MenuItem value={"English"}>English</MenuItem>
                                    <MenuItem value={"German"}>German</MenuItem>
                                    <MenuItem value={"Japanese"}>Japanese</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={0}/>
                        <Grid item md={3} xs={0}/>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="language-label">Translated Language</InputLabel>
                                <Select
                                    labelId="language-label"
                                    value={translatedLanguage}
                                    label="Translated Language"
                                    onChange={handleTranslatedLanguageChange}
                                >
                                    <MenuItem value={"English"}>English</MenuItem>
                                    <MenuItem value={"German"}>German</MenuItem>
                                    <MenuItem value={"Japanese"}>Japanese</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={0}/>
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
                    </Grid>
                )}
            />
        </div>
    );
}

export default App;
