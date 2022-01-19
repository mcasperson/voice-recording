import * as React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {AppContext} from "./AppContext";

export const Transcribe = (params) => {
    const appContext = React.useContext(AppContext);

    const [inputLanguage, setInputLanguage] = useState("English");
    const [transcribedText, setTranscribedText] = useState("");

    const handleInputLanguageChange = (event) => {
        setInputLanguage(event.target.value);
    };

    const getTranscribedText = (id) => {
        fetch("/transcribed/" + id)
            .then(response => response.json)
            .then(data => {
                if (data.status === "Finished") {
                    setTranscribedText(data.text);
                } else {
                    window.setTimeout(() => getTranscribedText(id), 5000);
                }
            })
    }

    const uploadBlob = async () => {
        const audioBlob = await fetch(appContext.mediaBlob).then(r => r.blob());

        const audioFile = new File([audioBlob], "audiofile.webm", {type: "audio/webm"})

        const data = new FormData()
        data.append('file', audioFile)
        data.append('language', inputLanguage)

        fetch('/recordings', {
            method: 'POST',
            body: data
        }).then(response => getTranscribedText(response))
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
            <Grid md={6} xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="language-label">Recorded Language</InputLabel>
                    <Select
                        labelId="language-label"
                        value={inputLanguage}
                        label="Recorded Language"
                        onChange={handleInputLanguageChange}
                    >
                        <MenuItem value={"English"}>English</MenuItem>
                        <MenuItem value={"German"}>German</MenuItem>
                        <MenuItem value={"Japanese"}>Japanese</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid item md={4} xs={0}/>
            <Grid item md={4} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    disabled={true}
                    onClick={uploadBlob}>
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
                    value={transcribedText}
                />
            </Grid>
            <Grid item md={3} xs={0}/>
            <Grid item md={3} xs={0}/>
            <Grid item md={3} xs={12}>
                <Button
                    variant="contained"
                    className={"fullWidth"}
                    onClick={() => params.nextStep()}
                    disabled={!transcribedText}>
                    Translate >
                </Button>
            </Grid>
        </Grid>
    </div>;
}
