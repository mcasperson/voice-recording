import * as React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {AppContext} from "./AppContext";

export const Translate = (params) => {
    const appContext = React.useContext(AppContext);

    const [processing, setProcessing] = useState(false);

    const handleOutputLanguageChange = (event) => {
        appContext.setTranslatedText("");
        appContext.setTargetLanguage(event.target.value);
    };

    const translateText = async () => {
        setProcessing(true);

        const data = new FormData();
        data.append('input', appContext.transcribedText);
        data.append('sourceLanguage', appContext.sourceLanguage);
        data.append('targetLanguage', appContext.targetLanguage);

        fetch('http://localhost:8080/translate', {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(data => appContext.setTranslatedText(data[0].translations[0].text))
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
                <h3>Translate your message</h3>
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="outputLanguage-label">Translated Language</InputLabel>
                    <Select
                        labelId="outputLanguage-label"
                        value={appContext.targetLanguage}
                        label="Translated Language"
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
                    onClick={translateText}>
                    Translate
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
                    value={appContext.translatedText}
                />
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid item md={3} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    onClick={() => {
                        appContext.setTranslatedText("");
                        params.previousStep();
                    }}
                    disabled={processing}>
                    &lt; Transcribe
                </Button>
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid item md={3} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    onClick={() => params.nextStep()}
                    disabled={!appContext.translatedText || processing}>
                    Speak &gt;
                </Button>
            </Grid>
        </Grid>
    </div>;
}
