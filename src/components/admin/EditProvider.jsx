import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Alert from '../Alert';
import { obtenerProvedor,cambiarComision } from '../../services/proveedor.service';

export default (props) => {
    let { id } = useParams();
    const [response, setResponse] = useState({ message: { type: '', message: '' } });
    const [commission, setCommission] = useState();
    const [provider, setProvider] = useState();
    const [providerId, setProviderId] = useState();


    useEffect(() => {
        obtenerProvedor(id).then(r => {
            setProvider(`${r[1]} ${r[2]}`);
            setCommission(r[5]);
            setProviderId(r[0]);
        });
    }, [id]);

    async function sendData(event) {
        event.preventDefault();
         await cambiarComision(providerId, commission).then(
            r=> setResponse(r)
        );

       
        
    }

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half mt-5">
                    <div className="card">

                        <div className="card-content">
                            <Link to='/providers'>
                                <FaArrowLeft />
                            </Link>
                            <div className="field" style={{ padding: "50px 100px" }}  >

                                <form  onSubmit={(event)=> sendData(event)}>
                                    <label className="label">Proveedor:</label>
                                    <div className="m-3 is-size-2">
                                        <span className="has-text-info">{provider} </span></div>

                                    <label htmlFor="#name" className="label">Comisión: <span className="has-text-success">{Math.trunc(commission * 100)} %</span></label>
                                    <div className="control">
                                        <input type="number" id="name" min="0.01" max="1" step="0.01" className="input is-primary is-small" required onChange={(event) => setCommission(event.target.value)} value={commission} />
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