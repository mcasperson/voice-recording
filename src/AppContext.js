import * as React from "react";

export const AppContext = React.createContext({
    setMediaBlob: (blob) => {},
    mediaBlob: null,
    setSourceLanguage: (text) => {},
    sourceLanguage: null,
    setTargetLanguage: (text) => {},
    targetLanguage: null,
    setTranscribedText: (text) => {},
    transcribedText: null,
    setTranslatedText: (text) => {},
    translatedText: null,
    config: null
});