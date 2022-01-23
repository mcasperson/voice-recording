import './App.css';
import * as React from "react";
import StepWizard from "react-step-wizard";
import {Record} from "./Record";
import {Transcribe} from "./Transcribe";
import {Translate} from "./Translate";
import {AppContext} from "./AppContext";
import {Speak} from "./Speak";

function App() {

    const [mediaBlob, setMediaBlob] = React.useState(null);
    const [transcribedText, setTranscribedText] = React.useState(null);
    const [translatedText, setTranslatedText] = React.useState(null);
    const [sourceLanguage, setSourceLanguage] = React.useState("en-US");
    const [targetLanguage, setTargetLanguage] = React.useState("de-DE");

    return (
        <div className="App">
            <h1>Universal Translator</h1>
            <AppContext.Provider value={{
                mediaBlob,
                setMediaBlob,
                sourceLanguage,
                setSourceLanguage,
                targetLanguage,
                setTargetLanguage,
                transcribedText,
                setTranscribedText,
                translatedText,
                setTranslatedText}}>
                <StepWizard>
                    <Record/>
                    <Transcribe/>
                    <Translate/>
                    <Speak/>
                </StepWizard>
            </AppContext.Provider>
        </div>
    );
}

export default App;
