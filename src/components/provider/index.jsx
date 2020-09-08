import React, { useEffect, useState } from 'react';
import Options from '../shared/Options';
import { FcMultipleSmartphones, FcAbout, FcAreaChart, FcGrid } from 'react-icons/fc';
import OptionCard from '../shared/OptionCard';
import { getUserAuth, isProvider } from '../../services/auth.service';
import { nuevasNotificaciones } from '../../services/notificacion.service';
import { useHistory, useLocation } from "react-router-dom";




export default (props) => {
    const history = useHistory();
    let location = useLocation();

    const [notificaciones, setNotificaciones] = useState('');
    useEffect(() => {
        let authData = getUserAuth();
        if ((Object.keys(authData).length === 0) || isProvider() === false) {
            history.push("/");
        }
        nuevasNotificaciones().then(resp => setNotificaciones(resp.message));
    }, [history, location.pathname]);

    const options = [
        {
            title: 'Productos',
            icon: <FcMultipleSmartphones />,
            content: 'Gestión de productos',
            url: '/brands',
            info: ''
        }, {
            title: 'Ventas',
            content: 'Consulte ventas las realizadas',
            icon: <FcAreaChart />,
            url: '',
            info: ''
        }, {
            title: 'Facturación',
            content: 'Consulte sus valores a pagar',
            icon: <FcGrid />,
            url: '',
            info: ''
        },
        {
            title: 'Notificaciones',
            content: 'Consulte notificaciones de posibles ventas',
            icon: <FcAbout />,
            url: '',
            info: notificaciones
        }


    ];
   
    return (
        <div className="container">
            <Options>
                {
                    options.map((option, index) => (
                        <OptionCard title={option.title} icon={option.icon} url={option.url} content={option.content} key={index} info={option.info} />
                    ))
                }
            </Options>
        </div>
    )
}