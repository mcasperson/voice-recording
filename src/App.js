import './App.css';
import * as React from "react";
import StepWizard from "react-step-wizard";
import {Record} from "./Record";
import {Transcribe} from "./Transcribe";
import {Translate} from "./Translate";
import {AppContext} from "./AppContext";

function App() {

    const [mediaBlob, setMediaBlob] = React.useState(null);
    const [transcribedTextId, setTranscribedTextId] = React.useState(null);
    const [translatedTextUrl, setTranslatedTextUrl] = React.useState(null);

    return (
        <div className="App">
            <h1>Universal Translator</h1>
            <AppContext.Provider value={{
                mediaBlob,
                setMediaBlob,
                transcribedTextId,
                setTranscribedTextId,
                translatedTextUrl,
                setTranslatedTextUrl}}>
                <StepWizard>
                    <Record/>
                    <Transcribe/>
                    <Translate/>
                </StepWizard>
            </AppContext.Provider>
        </div>
    );
}

export default App;
