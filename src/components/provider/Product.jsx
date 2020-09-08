import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { listarMarcas } from '../../services/marcas.service';
import { listarModelosPorMarca } from '../../services/modelos.service';
import { isAdmin, isProvider, getUserAuth } from '../../services/auth.service';
import { useState } from 'react';

export default (props) => {
    const history = useHistory();
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [model, setModel] = useState('');
    const [provider, setProvider] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0) {
            history.push("/");
        } else if (isProvider()) {
            setProvider(authData.email);
            listarMarcas().then(
                r => setMarcas(r)
            );
        }else{
            history.push("/");
        }
    }, [history]);

    let cargarModelos = (marca) => {
        console.log( marca);
        if (marca !== '') {
            listarModelosPorMarca(marca).then(r => setModelos(r))


        }else{
            setModel('');
            setModelos([]);
        }
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
                                            marcas.map(m => (
                                                <option value={m.id}>{m.nombre}</option>

                                            ))
                                        }
                                    </select>

                                </div>
                                <label htmlFor="#model" className="label">Modelo</label>
                                <div className="select">
                                    <select name="brand" id="#brand" onChange={event => setModel(event.target.value)} value={model} >
                                        <option value="">Seleccionar</option>
                                        {
                                            modelos.map(m => (
                                                <option value={m.id}>{m.nombre}</option>

                                            ))
                                        }
                                    </select>
                                </div>
                                <label htmlFor="#description" className="label">Descripción</label>
                                <div className="control">
                                    <textarea name="description" id="description" className="textarea">
                                    </textarea>
                                </div>
                                <label htmlFor="#price" className="label">Precio</label>
                                <div className="control">
                                    <input type="text" name="price" id="price" className="input" />
                                </div>
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