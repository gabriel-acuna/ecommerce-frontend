import React, { useState, useEffect } from 'react';
import { resgistrarModelo } from '../../../services/modelos.service';
import Alert from '../../Alert';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams, useHistory } from 'react-router-dom';
import { isProvider, isAdmin, getUserAuth } from '../../../services/auth.service';


export default () => {


    const [name, setName] = useState('');
    const [response, setResponse] = useState({ message: { type: '', message: '' } });
    let { marca } = useParams();
    const history = useHistory();

    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0) {
            history.push("/");
        } else if (!isAdmin() && !isProvider()) {
            history.push("/");
        }
    }, [history]);

    async function sendData(event) {
        event.preventDefault();
        let resp = await resgistrarModelo({ name, brandId: marca });

        if (resp.message.type === 'success') {
            setName('')
        }
        setResponse(resp);
    }
    return (


        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half mt-5">
                    <div className="card">
                        <div className="card-content">
                            <Link to='/brands'>
                                <FaArrowLeft />
                            </Link>
                            <div className="field" style={{ padding: "100px" }}  >
                                <form onSubmit={(event) => sendData(event)}>
                                    <label htmlFor="#name" className="label">Modelo</label>
                                    <div className="control">
                                        <input type="name" id="name" className="input is-primary is-small" required onChange={(event) => setName(event.target.value)} value={name} />
                                    </div>

                                    <div className="control mt-5">
                                        <button className="button is-success">Guardar</button>
                                        {response && response.message.type === 'warning' && <Alert type={'is-warning'} content={response.message.content}>
                                            <button className="delete" onClick={event => setResponse({ message: { type: '', message: '' } })} ></button> </Alert>}
                                        {response && response.message.type === 'success' && <Alert type={'is-success'} content={response.message.content}>
                                            <button className="delete" onClick={event => setResponse({ message: { type: '', message: '' } })}></button></Alert>}
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}