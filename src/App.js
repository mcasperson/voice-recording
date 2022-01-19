import './App.css';
import {ReactMediaRecorder} from "react-media-recorder";
import Button from '@mui/material/Button';
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import StepWizard from "react-step-wizard";
import {Record} from "./Record";
import {Transcribe} from "./Transcribe";
import {Translate} from "./Translate";

function App() {
    return (
        <div className="App">
            <h1>Universal Translator</h1>
            <StepWizard>
                <Record/>
                <Transcribe/>
                <Translate/>
            </StepWizard>
        </div>
    );
}

export default App;
