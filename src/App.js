import './App.css';
import * as React from "react";
import StepWizard from "react-step-wizard";
import {Record} from "./Record";
import {Transcribe} from "./Transcribe";
import {Translate} from "./Translate";
import {AppContext} from "./AppContext";
import {Speak} from "./Speak";
import {useEffect} from "react";

function App() {

    const [mediaBlob, setMediaBlob] = React.useState(null);
    const [transcribedText, setTranscribedText] = React.useState("");
    const [translatedText, setTranslatedText] = React.useState("");
    const [sourceLanguage, setSourceLanguage] = React.useState("en-US");
    const [targetLanguage, setTargetLanguage] = React.useState("de-DE");
    const [config, setConfig] = React.useState(null);

    useEffect(() => {
        fetch('config.json', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setConfig(data))
            .catch(() => window.alert("Failed to load settings"))
    }, []);

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
                setTranslatedText,
                config
            }}>
                {config != null && <StepWizard>
                    <Record/>
                    <Transcribe/>
                    <Translate/>
                    <Speak/>
                </StepWizard>}
                {config == null &&
                    <h2>Loading Configuration</h2>}
            </AppContext.Provider>
        </div>
    );
}

export default App;
