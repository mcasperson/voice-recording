import * as React from "react";

export const AppContext = React.createContext({
    setMediaBlob: (blob) => {},
    mediaBlob: null,
    setTranscribedText: (text) => {},
    transcribedText: null,
    setTranslatedText: (text) => {},
    translatedText: null
});