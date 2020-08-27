import React, { useState } from 'react';
import { login } from '../services/auth.service';
import { useHistory } from "react-router-dom";
import  Alert  from './Alert';
export default (props) => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    let checkPermission = (auth) => {
        switch (auth[0]) {
            case 'ROLE_USER':
                history.push('/costumer');
                break;
            case 'ROLE_PROVIDER':
                history.push('/provider');
                break;
            default:
                history.push('/admin');
                break;
        }
    }

    let sendCredentials = (event) => {
        event.preventDefault();
        login({ username: email, password }).then(resp => {
            if ((Object.keys(resp).length > 0 && resp.accessToken)) {
                checkPermission(resp.roles);
            } else {
                setHasError(true);
            }
        });




    }
    return (
        <div className="container mt-5">
            <div className="columns is-centered">
                <div className="column  is-one-quarter has-background-white-ter p-3">

                    <div className="field mx-2 mt-3">
                        <form onSubmit={(event) => sendCredentials(event)}>
                            <label htmlFor="#email" className="label">Usuario o Email</label>
                            <div className="control">
                                <input type="email" id="email" className="input is-primary" required onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <label htmlFor="#password" className="label">Contraseña</label>
                            <div className="control">
                                <input type="password" className="input is-primary" required onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <div className="control mt-2">
                                <button className="button is-primary is-pulled-right">Iniciar sesión</button>

                                {hasError && <Alert type={'is-danger'} content={"Usuario/Email o Contraseña inconrecta"}>
                                    <button className="delete" onClick={event => setHasError(false)}></button></Alert>}
                            </div>

                        </form>


                    </div>
                </div>
            </div>


        </div>

    )
}