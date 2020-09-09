import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import { listarMarcas } from '../../services/marcas.service';
import { listarModelosPorMarca } from '../../services/modelos.service';
import { isProvider, getUserAuth } from '../../services/auth.service';
import { saveProduct } from '../../services/productos.service';
import { useState } from 'react';
import Alert from '../Alert';
import { FirebaseContext } from '../../App';

export default (props) => {
    const context = useContext(FirebaseContext);
    const history = useHistory();
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [model, setModel] = useState('');
    const [provider, setProvider] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0.00);
    const [urlImage, setUrlImage] = useState('');
    const [uploadValue, setUploadValue] = useState(0);
    const [response, setResponse] = useState({ message: { type: '', message: '' } });
    

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
        const storageRef = context.storage(`products/${provider}/${file.name}`);
        const task = storageRef.put(file);
        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

            setUploadValue(percentage);

        }, (error) => {
            console.error(error.message)
        }, () => {

            storageRef.getDownloadURL().then(r => setUrlImage(r));
        })
    }

    let sendData = async (event) => {
        event.preventDefault();
        let resp = await saveProduct({
            model,
            provider,
            price,
            description,
            urlImage
        });
        if (resp.message.type === 'success') {
            setModel('');
            setUrlImage('');
            setPrice(0.0);
            setDescription('')
        }
        setResponse(resp)
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
                            <form onSubmit={event => sendData(event)}>
                                <label htmlFor="#brand" className="label">Marca</label>
                                <div className="select">
                                    <select name="brand" id="#brand" onChange={event => { cargarModelos(event.target.value) }} required>
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
                                    <select name="brand" id="#brand" onChange={event => setModel(event.target.value)} value={model} required>
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
                                    <textarea name="description" id="description" className="textarea" onChange={event => setDescription(event.target.value)} value={description} required>

                                    </textarea>
                                </div>
                                <label htmlFor="#price" className="label">Precio</label>
                                <div className="control">
                                    <input type="number" min="0.01"  step="0.01" max="10000000" name="price" id="price" className="input" onChange={event => setPrice(event.target.value)} value={price} required />
                                </div>

                                <label htmlFor="#urlImage" className="label">Imagen</label>
                                <progress value={uploadValue} max='100'>
                                    {uploadValue} %
                                </progress>
                                <label className="file-label">
                                    <input className="file-input" type="file" name="urlImage" onChange={event => uploadImage(event)} />

                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <FaUpload />
                                        </span>
                                        <span className="file-label">
                                            Seleccionar imagen
                                         </span>
                                    </span>

                                </label>

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
    )
}