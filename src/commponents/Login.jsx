import React from 'react';
import { useState } from 'react';


export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let sendCredentials = (event) => {
        event.preventDefault();
        if (email !== null || password !== null) {
            console.log(email, password);
        }
    }
    return (
        <div className="container mt-5">
            <div className="columns is-centered">
                <div className="column  is-one-quarter has-background-white-ter p-3">

                    <div className="field mx-2 mt-3">
                        <form onSubmit={(event) => sendCredentials(event)}>
                            <label htmlFor="#email" className="label">Email</label>
                            <div className="control">
                                <input type="email" id="email" className="input is-primary" required onChange={(event) => setEmail(event.target.value)} />
                            </div>
                            <label htmlFor="#password" className="label">Contraseña</label>
                            <div className="control">
                                <input type="password" className="input is-primary" required onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <div className="control mt-2">
                                <button className="button is-primary is-pulled-right">Registrar</button>
                            </div>

                        </form>


                    </div>
                </div>
            </div>


        </div>

    )
}