import React from 'react';
import Options from '../shared/Options';
import { FcMultipleSmartphones, FcCollaboration } from 'react-icons/fc';
import OptionCard from '../shared/OptionCard';

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

console.log(options);
export default (props) => {

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