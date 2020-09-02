import React, {useEffect} from 'react';
import Options from '../shared/Options';
import { FcMultipleSmartphones, FcCollaboration } from 'react-icons/fc';
import OptionCard from '../shared/OptionCard';
import {getUserAuth, isAdmin} from '../../services/auth.service';

import { useHistory, useLocation } from "react-router-dom";

const options = [
    {
        title: 'Productos',
        icon: <FcMultipleSmartphones />,
        content: 'Gestión de marcas y modelos',
        url: '/brands'
    }, {
        title: 'Proveedores',
        content: 'Gestión los provedores y las comisiones ',
        icon: <FcCollaboration />,
        url: '/providers'
    }
];

export default (props) => {
   
        const history = useHistory();
        let location = useLocation();
    
        useEffect(() => {
            let authData = getUserAuth();
            if ((Object.keys(authData).length === 0)  || !isAdmin()){
                history.push("/");
            }
        }, [history, location.pathname]);
    
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