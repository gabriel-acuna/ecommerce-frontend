import React, {Fragment} from 'react';


export default (props) => {

    return (
       
        <div className = {`notification ${props.type} mt-3`} >
             <Fragment>
                {props.children}
             </Fragment>
           
            <p>
           { props.content}
            </p>
        </div >
       
    )
}