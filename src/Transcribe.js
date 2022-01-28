import * as React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {AppContext} from "./AppContext";

export const Transcribe = (params) => {
    const appContext = React.useContext(AppContext);

    const [processing, setProcessing] = useState(false);

    const handleOutputLanguageChange = (event) => {
        appContext.setTranscribedText("");
        appContext.setSourceLanguage(event.target.value);
    };

    const transcribeText = async () => {
        setProcessing(true);
        appContext.setTranscribedText(null);

        const audioBlob = await fetch(appContext.mediaBlob).then(r => r.blob());

        const audioFile = new File([audioBlob], "audiofile.webm", {type: "audio/webm"});

        const data = new FormData();
        data.append('file', audioFile);
        data.append('sourceLanguage', appContext.sourceLanguage);

        fetch(appContext.config.translateService + "/transcribe", {
            method: 'POST',
            body: data
        })
            .then(response => response.text())
            .then(data => appContext.setTranscribedText(data))
            .catch(() => window.alert("Failed to transcribe message"))
            .finally(() => setProcessing(false))
    }

    return <div>
        <Grid
            container
            spacing={2}
            rowGap={2}
            justifyContent="center"
            alignItems="center">
            <Grid item xs={12}>
                <h3>Transcribe your message</h3>
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="outputLanguage-label">Recorded Language</InputLabel>
                    <Select
                        labelId="outputLanguage-label"
                        value={appContext.sourceLanguage}
                        label="Recorded Language"
                        onChange={handleOutputLanguageChange}
                    >
                        <MenuItem value={"en-US"}>English</MenuItem>
                        <MenuItem value={"de-DE"}>German</MenuItem>
                        <MenuItem value={"ja-JP"}>Japanese</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid item md={4} xs={0}/>
            <Grid item md={4} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    onClick={transcribeText}
                    disabled={processing}>
                    Transcribe
                </Button>
            </Grid>
            <Grid item md={4} xs={0}/>
            <Grid item md={3} xs={0}/>
            <Grid item md={6} xs={12}>
                <TextField
                    rows={10}
                    multiline={true}
                    fullWidth={true}
                    disabled={true}
                    value={appContext.transcribedText}
                />
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid item md={3} xs={0}/>
            <Grid item md={3} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    onClick={() => {
                        appContext.setTranscribedText("");
                        params.previousStep();
                    }}
                    disabled={processing}>
                    &lt; Record
                </Button>
            </Grid>
            <Grid item md={3} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    onClick={() => params.nextStep()}
                    disabled={!appContext.transcribedText || processing}>
                    Translate &gt;
                </Button>
            </Grid>
            <Grid item md={3} xs={0}/>
        </Grid>
    </div>;
}
