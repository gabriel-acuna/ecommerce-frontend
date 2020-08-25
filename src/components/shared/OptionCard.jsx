import React from 'react';


export default ({ title, icon, content }) => {

    return (
        <div className="column is-half">
            <div className="card" >
                <header className="card-header">
                    <p className="card-header-title">
                        {title}
                    </p>
                    <div  className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            {icon}
                        </span>
                    </div>
                </header>
                <div className="card-content">
                    <div className="content">
                      {content}
                    </div>
                </div>
                <footer className="card-footer">
                    
                </footer>
            </div>


        </div>
    )
}