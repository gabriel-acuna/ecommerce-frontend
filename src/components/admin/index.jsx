import React from 'react';
import Options from '../shared/Options';
import { FcMultipleSmartphones, FcCollaboration } from 'react-icons/fc';
import OptionCard from '../shared/OptionCard';

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