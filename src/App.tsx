import {useState} from 'react';
import './App.css';
import axios from "axios";
import {Box, Button, TextField} from "@material-ui/core";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function App() {
    const [id, setId] = useState("");
    const [url, setUrl] = useState("");
    const [copied, setCopied] = useState(false);
    console.log(window.location.host);

    function handleSubmit() {
        setCopied(false);
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
            <Box>
                <Box>
                    <h1>Shorten URL</h1>
                    <TextField id="url" label="URL" value={url}
                               onChange={(v) => setUrl(v.target.value)}/>
                    <Button variant="contained" color="primary" onClick={() => {
                        handleSubmit()
                    }}>Shorten!</Button>
                </Box>
                <Box>
                    <TextField id="generatedUrl"
                               label="Created URL"
                               value={fullUrl}
                               disabled/>
                </Box>
            </Box>
            <Box>
                <CopyToClipboard text={fullUrl}
                                 onCopy={() => fullUrl !== "" ? setCopied(true) : setCopied(false)}>
                    <Button variant="contained" color="primary">Copy to clipboard with button</Button>
                </CopyToClipboard>
                {copied ? "Copied" : ""}
            </Box>
        </div>
    );
}

export default App;
