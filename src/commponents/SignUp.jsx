import React, { useState } from 'react';


export default ({ isProvider=false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [document, setDocument] = useState('');

    console.log(isProvider);
    return (
        <div className="container mt-5">
            <div className="columns is-centered">
                <div className="column  is-one-quarter has-background-white-ter p-3">

                    <div className="field mx-2 mt-3">
                        <form>

                            <div className="control">
                                <label htmlFor="#email" className="label">Email</label>
                                <input type="email" id="email" className="input is-primary" required onChange={(event) => setEmail(event.target.value)} />
                            </div>
                           
                            <label htmlFor="#password" className="label">Contraseña</label>
                            <div className="control">
                                <input type="password" className="input is-primary" required onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            <label htmlFor="#password" className="label">Repetir Contraseña</label>
                            <div className="control">
                                <input type="password" id="password" className="input is-primary" required onChange={(event) => setPassword1(event.target.value)} />
                            </div>
                            <label htmlFor="#first-name" className="label">Nombre</label>
                            <div className="control">
                                <input type="text" id="first-name" className="input is-primary" required onChange={(event) => setFirstName(event.target.value)} />
                            </div>
                            <label htmlFor="#last-name" className="label">Apellido</label>
                            <div className="control">
                                <input type="text" className="input is-primary" required onChange={(event) => setLastName(event.target.value)} />
                            </div>
                            <label htmlFor="#document-type" className="label">Tipo Documento</label>
                            <div className="select">
                                <select required onChange={(event) => setDocumentType(event.target.value)}>
                                    <option>Elija una opción </option>
                                    <option value="1">Cédula</option>
                                    <option value="2">Pasaporte</option>
                                    <option value="3">RUC</option>
                                </select>
                            </div>
                            <label htmlFor="#document" className="label"># Documento</label>
                            <div className="control">
                                <input type="text" id="document" className="input is-primary" required onChange={(event) => setDocument(event.target.value)} />
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