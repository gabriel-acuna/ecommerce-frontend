import React, { useEffect } from 'react';
import Options from '../shared/Options';
import { FcMultipleSmartphones, FcCollaboration } from 'react-icons/fc';
import OptionCard from '../shared/OptionCard';
import { getUserAuth, isProvider } from '../../services/auth.service';
import { useHistory, useLocation } from "react-router-dom";

const options = [
    {
        title: 'Productos',
        icon: <FcMultipleSmartphones />,
        content: 'Gestión de productos',
        url: ''
    }, {
        title: 'Ventas',
        content: 'Consulte las realizadas',
        icon: <FcCollaboration />,
        url: ''
    }, {
        title: 'Facturación',
        content: 'Consulte sus valores a pagar',
        icon: <FcCollaboration />,
        url: ''
    },
    {
        title: 'Notificaciones',
        content: 'Consulte notificaiones de posibles ventas',
        icon: <FcCollaboration />,
        url: ''
    }


];

export default (props) => {
    const history = useHistory();
    let location = useLocation();

    useEffect(() => {
        let authData = getUserAuth();
        if ((Object.keys(authData).length === 0)  || isProvider()===false){
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