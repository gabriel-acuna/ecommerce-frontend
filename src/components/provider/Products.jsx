import React from 'react'; 
import {FaArrowLeft} from 'react-icons/fa';
import {
     Link } from "react-router-dom";

export default (props) => { 

    return (
    
                <div className="column is-half mt-5 ml-3">
                
                <div className="card">
                    <div className="card-content">
                <Link to='/'>
                            <FaArrowLeft/>
                        </Link>
                     <Link className="button  button is-primary is-inverted" to="/products/new">Nuevo producto</Link> 
                    <div className="table-container mt-5">
                        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                            <thead>
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
                            </thead>
                            <tbody>
                              
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
           </div>
         
    )
}