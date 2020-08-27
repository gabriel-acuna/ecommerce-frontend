import React, {useEffect} from 'react'; 
import {getUserAuth, isCostumer} from '../../services/auth.service';
import { useHistory, useLocation } from "react-router-dom";


export default (props) => {
    const history = useHistory();
    let location = useLocation();
  
    useEffect(() => {
        let authData = getUserAuth();
        if ((Object.keys(authData).length === 0 ) || isCostumer()===false) {
            history.push("/");
        } 
    },[history, location.pathname]);
    
    let auth = getUserAuth();
    
console.log( isCostumer());
    return (
        <div className="container">

            Bienvenido(a) {auth !=={} && <strong> {auth.firstName} </strong>}
        </div>
    )
}