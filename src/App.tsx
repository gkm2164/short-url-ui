import {useState} from 'react';
import './App.css';
import axios from "axios";

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

    return (
        <div className="App">
            <div>
                URL: <input type="text" value={url} onChange={(v) => setUrl(v.target.value)}/>
                <button onClick={() => {handleSubmit()}}>Submit</button>
            </div>
            <div>
                Generated URL: <input type="text" value={recoverHostName(id)} disabled />
            </div>
        </div>
    );
}

export default App;
