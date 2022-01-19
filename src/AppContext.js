import * as React from "react";

export const AppContext = React.createContext({
    setMediaBlob: (blob) => {},
    mediaBlob: null,
    setTranscribedText: (id) => {},
    transcribedText: null,
    setTranslatedTextUrl: (url) => {},
    translatedTextUrl: null
});