import * as React from "react";

export const AppContext = React.createContext({
    setMediaBlob: (blob) => {},
    mediaBlob: null,
    setTranscribedTextId: (id) => {},
    transcribedTextId: null,
    setTranslatedTextUrl: (url) => {},
    translatedTextUrl: null
});