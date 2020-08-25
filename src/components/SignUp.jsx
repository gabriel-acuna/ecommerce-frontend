import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import {register} from '../services/auth.service';
export default ({ isProvider = false }) => {
    const context = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [document, setDocument] = useState('');
    const [showPaswordNotification, setShowPaswordNotification] = useState(false);
    const [showPasword1Notification, setShowPasword1Notification] = useState(false);
    const [showPasword1Notification1, setShowPasword1Notification1] = useState(false);


    function sendUserData (event) {
        event.preventDefault();
        if(validatePasword){
           register( context,{
                email,
                password,
                firstName,
                lastName,
                documentType,
                document,
                isProvider

            })
        }

        
        
    }

    function validatePasword(){
        let isValid = false;
        let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
        if(password.match(passw)){
            isValid=true;
        } 
        else setShowPaswordNotification(true); isValid=false;
        if(password1.match(passw)){
            isValid=true;
        } 
        else setShowPasword1Notification(true); isValid=false;
        if(password === password1 ){
            isValid=true ;
        }setShowPasword1Notification1(true); isValid=false;
        return isValid;
    }
   
    
    return (
        <div className="container mt-5">
            <div className="columns is-centered">
                <div className="column  is-one-quarter has-background-white-ter p-3">

                    <div className="field mx-2 mt-3">
                        <form onSubmit={(event) => sendUserData(event)}>

                            <div className="control">
                                <label htmlFor="#email" className="label">Email</label>
                                <input type="email" id="email" className="input is-primary" required onChange={(event) => setEmail(event.target.value)} />

                            </div>

                            <label htmlFor="#password" className="label">Contraseña</label>
                            <div className="control">
                                <input type="password" className="input is-primary" required onChange={(event) => setPassword(event.target.value)} />
                               { showPaswordNotification && <div class="notification is-danger mt-3">
                                    <button class="delete"></button>
                                    La contraseña debe tener de <strong> 6 a 20 caracteres</strong> que contengan al menos un dígito numérico, una letra mayúscula y una minúscula

                                </div>}
                            </div>
                            <label htmlFor="#password" className="label">Repetir Contraseña</label>
                            <div className="control">
                                <input type="password" id="password" className="input is-primary" required onChange={(event) => setPassword1(event.target.value)} />
                                {showPasword1Notification && <div class="notification is-danger mt-3">
                                    <button class="delete"></button>
                                    Las contraseñas no coinciden

                                </div>}
                                { showPasword1Notification1 && <div class="notification is-danger mt-3">
                                    <button class="delete"></button>
                                    La contraseña debe tener de <strong> 6 a 20 caracteres</strong> que contengan al menos un dígito numérico, una letra mayúscula y una minúscula

                                </div>}
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