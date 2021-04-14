import {useState} from 'react';
import './App.css';
import axios from "axios";
import {Button, Grid, TextField} from "@material-ui/core";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useSnackbar} from "notistack";

function App() {
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");
    const {enqueueSnackbar} = useSnackbar();

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
                    <CopyToClipboard text={fullUrl}
                                     onCopy={() => enqueueSnackbar("URL is copied to clipboard!")}>
                        <Button variant="contained"
                                color="primary"
                                fullWidth><FileCopyIcon/></Button>
                    </CopyToClipboard>
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={12}>
                    <p><b>Backend code</b>: <a href="https://gben.me/aO10hw6MEtU">https://gben.me/aO10hw6MEtU</a></p>
                    <p><b>Frontend code</b>: <a href="https://gben.me/nz5F52HsAI5">https://gben.me/nz5F52HsAI5</a></p>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
