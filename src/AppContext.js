import * as React from "react";

export const AppContext = React.createContext({
    setMediaBlob: (blob) => {},
    mediaBlob: null
});