import axios, {AxiosResponse} from 'axios';
import React, {useState} from 'react';
import './App.css';


function App() {
    const HOST: string = "http://localhost:9797"

    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const btnClickedCreateImg = (): void => {
        console.log(`btnClickedCreateImg: ${prompt}`)
        setLoading(true);
        clear()
        axios.post(`${HOST}/image`, {prompt,})
            .catch(error => {
                console.log(`[ERROR] ${error}`);
                setErrorMsg(`[ERROR] ${error}`);
            })
            .then((response: AxiosResponse<any> | void): void => {
                if (response?.data.status === 200) {
                    setImageUrl(response.data.msg);
                } else {
                    console.log(response)
                    setErrorMsg(`[ERROR] ${response?.data.msg}`);
                }
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    const btnClickedCreateMsg = (): void => {
        console.log(`btnClickedCreateMsg: ${prompt}`)
        setLoading(true);
        clear()
        axios.post(`${HOST}/chat`, {prompt,})
            .catch(error => {
                console.log(`[ERROR] ${error}`);
                setErrorMsg(`[ERROR] ${error}`);
            })
            .then((response: AxiosResponse<any> | void): void => {
                if (response?.data.status === 200) {
                    setMessage(response.data.msg);
                } else {
                    console.log(response)
                    setErrorMsg(`[ERROR] ${response?.data.msg}`);
                }
            })
            .finally((): void => {
                setLoading(false);
            });
    };
    const onInputTextChanged = (event: any): void => {
        setPrompt(event.target.value);
    };

    const clear = (): void => {
        setMessage("")
        setImageUrl("")
        setErrorMsg("")
    };

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <div className="form">
                        <textarea rows={10} cols={80} onChange={onInputTextChanged}/>
                    </div>
                    <div>
                        <button className="btn btn-primary" onClick={btnClickedCreateMsg}>Chat</button>
                        <button className="btn btn-primary" onClick={btnClickedCreateImg}>Image</button>
                    </div>
                    <div>
                        {loading && <div>loading...</div>}
                        {!loading && imageUrl !== "" && <img src={imageUrl} alt="prompt"/>}
                        {!loading && message}
                        {!loading && errorMsg}
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
