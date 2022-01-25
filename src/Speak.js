import * as React from "react";
import {useState} from "react";
import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import {AppContext} from "./AppContext";

export const Speak = (params) => {
    const appContext = React.useContext(AppContext);

    const [processing, setProcessing] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);

    const convertText = async () => {
        setProcessing(true);
        setAudioBlob(null);

        const data = new FormData();
        data.append('input', appContext.translatedText);
        data.append('targetLanguage', appContext.targetLanguage);

        fetch(appContext.config.speakEndpoint, {
            method: 'POST',
            body: data
        })
            .then(response => response.blob())
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                setAudioBlob(objectURL);
            })
            .catch(() => window.alert("Failed to convert message to speech"))
            .finally(() => {
                setProcessing(false);
            })
    }

    return <div>
        <Grid
            container
            spacing={2}
            rowGap={2}
            justifyContent="center"
            alignItems="center">
            <Grid item xs={12}>
                <h3>Convert your message to speech</h3>
            </Grid>
            <Grid item md={4} xs={0}/>
            <Grid item md={4} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    disabled={processing}
                    onClick={convertText}>
                    Speak
                </Button>
            </Grid>
            <Grid item md={4} xs={0}/>
            <Grid item md={4} xs={0}/>
            <Grid item md={4} xs={12}>
                {audioBlob &&
                    <audio controls="controls" src={audioBlob} type="audio/wav"/>}
            </Grid>
            <Grid item md={4} xs={0}/>
            <Grid item md={3} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    onClick={() => {
                        setAudioBlob(null);
                        params.previousStep()
                    }}
                    disabled={processing}>
                    &lt; Translate
                </Button>
            </Grid>
        </Grid>
    </div>;
}
