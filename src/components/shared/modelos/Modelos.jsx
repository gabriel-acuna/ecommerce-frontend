import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { listarModelosPorMarca } from '../../../services/modelos.service';
import { Link } from "react-router-dom";
import { FaArrowLeft } from 'react-icons/fa';
import {getUserAuth, isAdmin, isProvider} from '../../../services/auth.service';


export default (props) => {

    const [modelos, setModelos] = useState([]);
    const history = useHistory();
    let { marca } = useParams();

    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0) {
            history.push("/");
        } else if (isAdmin() || isProvider()) {
                listarModelosPorMarca(marca).then(r => {
            if (r !== modelos) {
                setModelos(r)
            }
        
        });
    }
    });




    return (
        <div className="container">

            <div className="columns is-centered">
                <div className="column is-half mt-5 ml-3">

                    <div className="card">
                        <div className="card-content">
                            <Link to='/brands'>
                                <FaArrowLeft />
                            </Link>

                            <div className="table-container mt-5">
                                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                        <th>
                                            Marca
                            </th>
                                        <th>
                                            Opciones
                            </th>
                                    </thead>
                                    <tbody>
                                        {
                                            modelos.map((m, i) => (
                                                <tr key={i}>
                                                    <td>{m.nombre}</td>
                                                    <td>

                                                        <Link className="is-small button mr-3 is-info is-outlined" to={`/mod/${m.id}`}>Editar</Link>


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
