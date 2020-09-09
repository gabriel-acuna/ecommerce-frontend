import React, { useState, useEffect } from 'react';
import { listarMarcas } from '../../../services/marcas.service';
import { isProvider, isAdmin, getUserAuth } from '../../../services/auth.service';
import { useHistory, useLocation, Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import Products from '../../provider/Products';


export default (props) => {

    const [marcas, setMarcas] = useState([]);
    const history = useHistory();
    let location = useLocation();
    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0) {
            history.push("/");
        } else if (isAdmin() || isProvider()) {
            listarMarcas().then(r => {
                if (Object.keys(r).length > 0) {
                    setMarcas(r);
                }
            });
        } else {
            history.push('/')
        }
    }, [history, location.pathname]);



    return (
        <div className="container">

            <div className="columns is-centered multiline">
                <div className="column is-half mt-5 ml-3">

                    <div className="card">
                        <div className="card-content">
                            {isProvider() && !isAdmin() && <Link to='/provider'>
                                <FaArrowLeft />
                            </Link>}
                            {!isProvider() && isAdmin() && <Link to='/admin'>
                                <FaArrowLeft />
                            </Link>}


                            <Link className="button  button is-primary is-inverted" to="/brand">Nueva marca</Link>
                            {
                                isProvider() && <Link to="/products-managment" className="button  button is-info is-inverted"> Productos</Link>
                            }
                            <div className="table-container mt-5">
                                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                Marca
                                        </th>
                                            <th>
                                                Opciones
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            marcas.map((m, i) => (
                                                <tr key={i}>
                                                    <td>{m.nombre}</td>
                                                    <td>
                                                        <Link className="is-small button mr-3 is-primary is-outlined" to={`/model/${m.id}`}>Agregar Modelo</Link>

                                                        <Link className="is-small button mr-3 is-info is-outlined" to={`/brand/${m.id}`}>Editar</Link>
                                                        <Link className="is-small button mr-3 is-success is-outlined" to={`/models/${m.id}`}>Ver Modelos</Link>

                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}