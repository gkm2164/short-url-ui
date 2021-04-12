import {useState} from 'react';
import './App.css';
import axios from "axios";
import {Button, Grid, TextField} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function App() {
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");
    console.log(window.location.host);

    function handleSubmit() {
        axios.post("/", {url})
            .then((res) => res.data)
            .then((res) => setId(res.id));
    }

    function recoverHostName(id: string): string {
        const {protocol, host} = window.location;

        if (id !== '') {
            return `${protocol}//${host}/${id}`;
        } else {
            return '';
        }
    }

    const fullUrl = recoverHostName(id);

    return (
        <div className="App">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h1>Shorten URL</h1>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={8}>
                    <TextField id="url"
                               label="URL"
                               value={url}
                               onChange={(v) => setUrl(v.target.value)}
                               fullWidth/>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => {
                                handleSubmit()
                            }}
                            fullWidth>Shorten!</Button>
                </Grid>
                <Grid item xs={1}/>

                <Grid item xs={1}/>
                <Grid item xs={8}>
                    <TextField id="generatedUrl"
                               label="Created URL"
                               value={fullUrl}
                               fullWidth
                               disabled/>
                </Grid>
                <Grid item xs={2}>
                    <CopyToClipboard text={fullUrl}>
                        <Button variant="contained"
                                color="primary"
                                fullWidth><FileCopyIcon/></Button>
                    </CopyToClipboard>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>
    );
}

export default App;
