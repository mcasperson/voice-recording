import * as React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";

export const Translate = (params) => {
    const [outputLanguage, setOutputLanguage] = useState("German");

    const handleOutputLanguageChange = (event) => {
        setOutputLanguage(event.target.value);
    };

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
                        value={outputLanguage}
                        label="Recorded Language"
                        onChange={handleOutputLanguageChange}
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
                    disabled={true}>
                    Translate
                </Button>
            </Grid>
            <Grid item md={4} xs={0}/>
        </Grid>
    </div>;
}
