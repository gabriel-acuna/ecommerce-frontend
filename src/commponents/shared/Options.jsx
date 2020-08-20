import React from 'react';



export default (props) => {

    return (
        <div className="columns is-multiline is-centered mt-4">
            {props.children}
        </div>
    )
}