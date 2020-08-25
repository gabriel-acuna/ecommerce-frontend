import React from 'react';
import i1 from '../assets/undraw_business_deal_cpi9.svg';
import i2 from '../assets/undraw_task_list_6x9d.svg';
export default (props) => {

    return (
        <div>
            
            <div className="container">

                <div className="columns mt-5 is-centered">


                    <div className="column">

                        <figure>
                            <img src={i1} alt="illustation" />
                        </figure>
                    </div>
                    <div className="column">
                        <figure>
                            <img src={i2} alt="illustation" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>

    )
}