import React, {useEffect} from 'react';
import Options from '../shared/Options';
import { FcMultipleSmartphones, FcCollaboration } from 'react-icons/fc';
import OptionCard from '../shared/OptionCard';
import {getUserAuth} from '../../services/auth.service';
import { listarMarcas } from '../../services/marcas.service';
import { useHistory, useLocation } from "react-router-dom";

const options = [
    {
        title: 'Productos',
        icon: <FcMultipleSmartphones />,
        content: 'Gestión de marcas y modelos',
        url: ''
    }, {
        title: 'Proveedores',
        content: 'Gestión los provedores y las comisiones ',
        icon: <FcCollaboration />,
        url: ''
    }
];

export default (props) => {
   
        const history = useHistory();
        let location = useLocation();
    
        useEffect(() => {
            let authData = getUserAuth();
            if ((Object.keys(authData).length === 0)  || authData.roles[0]!=='ROLE_ADMIN'){
                history.push("/");
            }
        }, [history, location.pathname]);
    console.log(listarMarcas())
    return (
        <div className="container">
            <Options>
                {
                    options.map((option, index) => (
                        <OptionCard title={option.title} icon={option.icon} url={option.url} content={option.content} key={index} />
                    ))
                }
            </Options>
        </div>
    )
}