import React, { useState } from 'react';
//import {getUserAuth} from '../services/auth.service';
import { register } from '../services/auth.service';
import Alert from './Alert';
export default ({ isProvider }) => {

    const [response, setResponse] = useState({ message: { type: '', message: '' } });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [document, setDocument] = useState('');
    const [showUsernameNotification, setShowUsernameNotification] = useState(false);
    const [showPaswordNotification, setShowPaswordNotification] = useState(false);
    const [showPasword1Notification, setShowPasword1Notification] = useState(false);
    const [showPasword1Notification1, setShowPasword1Notification1] = useState(false);

    function sendUserData(event) {
        event.preventDefault();

        if (validatePasword() && validateUsername()) {
            register({
                username,
                email,
                password,
                firstName,
                lastName,
                documentType,
                document,
                provider: isProvider

            }).then(
                res => {
        
                    if (res.message.type === 'success') {
                        setDocument('');
                        setDocumentType('');
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setPassword('');
                        setPassword1('');
                        setUsername('');
                    }
                    setResponse(res);
                }
            );



        }



    }

    function validateUsername() {
        let regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{6,50}$/;
        let isVail = regex.test(username);
        if (isVail) {
            return true;
        } else {
            setShowUsernameNotification(true);
            return false
        }
    }

    function validatePasword() {
        let isValid = false;
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
        if (passw.test(password)) {
            isValid = true;
        }
        else { setShowPaswordNotification(true); isValid = false; }
        if (passw.test(password1)) {
            isValid = true;
        }
        else { setShowPasword1Notification(true); isValid = false; }
        if (password === password1) {
            isValid = true;
        } else { setShowPasword1Notification1(true); isValid = false; }
        return isValid;
    }


    return (
        <div className="container mt-5">
            <div className="columns is-centered">
                <div className="column  is-one-quarter has-background-white-ter p-3">

                    <div className="field mx-2 mt-3">
                        <form onSubmit={(event) => sendUserData(event)}>
                            <div className="control">
                                <label htmlFor="#username" className="label">Usuario</label>
                                <input type="username" id="username" className="input is-primary" required onChange={(event) => setUsername(event.target.value)} value={username} />
                                {
                                    showUsernameNotification && <Alert>
                                        <button className="delete" onClick={event => setShowUsernameNotification(false)}></button>
                                    </Alert>
                                }
                            </div>

                            <div className="control">
                                <label htmlFor="#email" className="label">Email</label>
                                <input type="email" id="email" className="input is-primary" required onChange={(event) => setEmail(event.target.value)} value={email} />

                            </div>

                            <label htmlFor="#password" className="label">Contraseña</label>
                            <div className="control">
                                <input type="password" className="input is-primary" required onChange={(event) => setPassword(event.target.value)} value={password} />
                                {showPaswordNotification && <Alert
                                    type={"is-danger"}
                                    content={"La contraseña debe tener de 6 a 20 caracteres que contengan al menos un dígito numérico, una letra mayúscula y una minúscula"}
                                >
                                    <button className="delete" onClick={event => setShowPaswordNotification(false)}></button>
                                </Alert>
                                }
                            </div>
                            <label htmlFor="#password" className="label">Repetir Contraseña</label>
                            <div className="control">
                                <input type="password" id="password" className="input is-primary" required onChange={(event) => setPassword1(event.target.value)} value={password1} />
                                {showPasword1Notification1 && <Alert type="is-danger"

                                    content={"Las contraseñas no coinciden"}
                                >
                                    <button class="delete" onClick={event => setShowPasword1Notification1(false)}></button>
                                </Alert>
                                }
                                {showPasword1Notification && <Alert
                                    type={"is-danger"}
                                    content={"La contraseña debe tener de 6 a 20 caracteres que contengan al menos un dígito numérico, una letra mayúscula y una minúscula"}
                                >
                                    <button className="delete" onClick={event => setShowPasword1Notification(false)}></button>
                                </Alert>
                                }
                            </div>
                            <label htmlFor="#first-name" className="label">Nombre</label>
                            <div className="control">
                                <input type="text" id="first-name" className="input is-primary" required onChange={(event) => setFirstName(event.target.value)} value={firstName} />
                            </div>
                            <label htmlFor="#last-name" className="label">Apellido</label>
                            <div className="control">
                                <input type="text" className="input is-primary" required onChange={(event) => setLastName(event.target.value)} value={lastName} />
                            </div>
                            <label htmlFor="#document-type" className="label">Tipo Documento</label>
                            <div className="select">
                                <select required onChange={(event) => setDocumentType(event.target.value)} value={documentType}>
                                    <option>Elija una opción </option>
                                    <option value="1">Cédula</option>
                                    <option value="2">Pasaporte</option>
                                    <option value="3">RUC</option>
                                </select>
                            </div>
                            <label htmlFor="#document" className="label"># Documento</label>
                            <div className="control">
                                <input type="text" id="document" className="input is-primary" required onChange={(event) => setDocument(event.target.value)} value={document} />
                            </div>
                            <div className="control mt-2">
                                <button className="button is-primary is-pulled-right">Registrar</button>

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
    )
}