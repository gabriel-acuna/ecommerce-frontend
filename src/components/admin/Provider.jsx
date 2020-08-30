import React,{useEffect, useState} from 'react'; 
import { useHistory, useLocation, Link } from "react-router-dom";
import {FaArrowLeft} from 'react-icons/fa';
import { listarProvedores} from '../../services/proveedor.service';
import { isAdmin, getUserAuth } from '../../services/auth.service';


export default (props) => { 
    const [proveedores, setProveedores] = useState([]);
    const history = useHistory();
        let location = useLocation();
    useEffect(() => {
        let authData = getUserAuth();
        if (Object.keys(authData).length === 0){
            history.push("/");
        }else if( isAdmin()){
            listarProvedores().then(r=>{
                if(Object.keys(r).length > 0){
                    setProveedores(r);
                }
            });
        }else{
            history.push('/')
        }
    }, [history, location.pathname]);
    
    return (
        <div className="container">

            <div className="columns is-centered">
                <div className="column is-half mt-5 ml-3">
                <Link to='/admin'>
                            <FaArrowLeft/>
                        </Link>
                    
                    <div className="table-container mt-5">
                        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                            <thead>
                                <th>
                                    Proveedor
                                </th>
                                <th>
                                   Comisión
                                </th>
                                <th>
                                    Opciones
                                </th>
                            </thead>
                            <tbody>
                                {
                                    proveedores.map((p, i) => (
                                        <tr key={i}>
                                            <td>{p[1]} {p[2]}</td>
                                            <td>{p[5]}</td>
                                            <td>
                                                

                                                <button className="is-small button mr-3 is-info is-outlined">Editar</button>
                                               

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
    )
}