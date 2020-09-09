import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import { listarMarcas } from '../../services/marcas.service';
import { listarModelosPorMarca } from '../../services/modelos.service';
import { isProvider, getUserAuth } from '../../services/auth.service';
import { useState } from 'react';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default (props) => {
    const history = useHistory();
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [model, setModel] = useState('');
    const [provider, setProvider] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.00);
    const [urlImage, setUrlImage] = useState('');
    const [uploadValue, setUploadValue] = useState(0);

    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0) {
            history.push("/");
        } else if (isProvider()) {
            setProvider(authData.email);
            listarMarcas().then(
                r => setMarcas(r)
            );
        } else {
            history.push("/");
        }
    }, [history]);

    let cargarModelos = (marca) => {
        console.log(marca);
        if (marca !== '') {
            listarModelosPorMarca(marca).then(r => setModelos(r))


        } else {
            setModel('');
            setModelos([]);
        }
    }

    let uploadImage = (event) => {
        const file = event.target.files[0];
        const storageRef = firebase.storage().ref(`products/${provider}/${file.name}`);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            
                setUploadValue(percentage);
           
        }, (error) => {
            console.error(error.message)
        }, () => {
            // Upload complete
            //setUrlImage(storageRef.getDownloadURL)
            storageRef.getDownloadURL().then(r=>setUrlImage(r));
        })
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
                        </div>

                        <div className="field" style={{ padding: "20px 100px" }}>
                            <form>
                                <label htmlFor="#brand" className="label">Marca</label>
                                <div className="select">
                                    <select name="brand" id="#brand" onChange={event => { cargarModelos(event.target.value) }}>
                                        <option value="">Seleccionar</option>
                                        {
                                            marcas.map((m, i) => (
                                                <option value={m.id} key={i}>{m.nombre}</option>

                                            ))
                                        }
                                    </select>

                                </div>
                                <label htmlFor="#model" className="label">Modelo</label>
                                <div className="select">
                                    <select name="brand" id="#brand" onChange={event => setModel(event.target.value)} value={model} >
                                        <option value="">Seleccionar</option>
                                        {
                                            modelos.map((m, i) => (
                                                <option value={m.id} key={i}>{m.nombre}</option>

                                            ))
                                        }
                                    </select>
                                </div>
                                <label htmlFor="#description" className="label">Descripción</label>
                                <div className="control">
                                    <textarea name="description" id="description" className="textarea" onChange={event => setDescription(event.target.value)} value={description}>

                                    </textarea>
                                </div>
                                <label htmlFor="#price" className="label">Precio</label>
                                <div className="control">
                                    <input type="number" min="0.01" max="1" step="0.00" name="price" id="price" className="input" onChange={event => setPrice(event.target.valueAsNumber)} value={price} />
                                </div>

                                <label htmlFor="#urlImage" className="label">Imagen</label>
                                <progress value={uploadValue} max='100'>
                                    {uploadValue} %
                                </progress>
                                <label class="file-label">
                                    <input class="file-input" type="file" name="urlImage" onChange={event => uploadImage(event)} />

                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <FaUpload />
                                        </span>
                                        <span class="file-label">
                                            Seleccionar imagen
                                         </span>
                                    </span>

                                </label>
                                        {urlImage}
                                <div className="control mt-5">
                                    <button className="button is-success">Guardar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}