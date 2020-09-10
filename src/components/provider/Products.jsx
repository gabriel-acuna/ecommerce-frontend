import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { getProductsByProvider } from '../../services/productos.service';
import { getUserAuth, isAdmin, isCostumer } from '../../services/auth.service';
import { useHistory } from 'react-router-dom';
import {
    Link
} from "react-router-dom";
import { useState } from 'react';

export default (props) => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0) {
            history.push("/");
        } else if (isAdmin() || isCostumer()) {
            history.push("/");
        }
        getProductsByProvider().then(
            r => {
                
                if (Object.keys(r).length > 0) {
                   setProducts(r)
                }
            }
        );

    }, [history]);
    return (
        <div className="container">

            <div className="columns is-centered multiline">
                <div className="column is-half mt-5 ml-3">

                    <div className="card">
                        <div className="card-content">
                            <Link to='/provider'>
                                <FaArrowLeft />
                            </Link>
                            <Link className="button  button is-primary is-inverted" to="/products/new">Nuevo producto</Link>
                            <div className="table-container mt-5">
                                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>
                                                Marca
                                            </th>
                                            <th>
                                                Moledlo
                                            </th>
                                            <th>
                                                Precio
                                            </th>
                                            <th>
                                                Opciones
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products.map((p,i) => (
                                                <tr key={i}>
                                                    <td>{p.modelo.marca.nombre}</td>
                                                    <td>{p.modelo.nombre}</td>
                                                    <td>{p.precio}</td>
                                                    <td> <Link to={`/products-managment/${p.id}`} className="is-small button mr-3 is-info is-outlined">Editar</Link></td>
                                                </tr>
                                            )
                                            )
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