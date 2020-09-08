import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { modificarMarca, getMarca } from '../../../services/marcas.service';
import Alert from '../../Alert';
import { useHistory,  Link } from "react-router-dom";
import { isProvider, isAdmin, getUserAuth } from '../../../services/auth.service';

import { FaArrowLeft } from 'react-icons/fa';


export default (props) => {
    let { id } = useParams();
    const history = useHistory();

    const [name, setName] = useState('');
    const [response, setResponse] = useState({ message: { type: '', message: '' } });
    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0) {
            history.push("/");
        } else if (isAdmin() || isProvider()) {
            getMarca(id).then(r => setName(r.nombre));
        }else{
            history.push("/");
        }
    }, [history, id]);

    async function sendData(event) {
        event.preventDefault();
        let resp = await modificarMarca(id, { name });

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
                                    <label htmlFor="#name" className="label">Marca</label>
                                    <div className="control">
                                        <input type="text" id="name" className="input is-primary is-small" required onChange={(event) => setName(event.target.value)} value={name} />
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