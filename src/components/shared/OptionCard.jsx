import React from 'react';
import { useHistory, Link } from "react-router-dom";

export default ({ title, icon, content, url, info }) => {
    const history = useHistory();

    return (
        <div className="column is-half">
            <Link to={url}>
                <div className="card"  >
                    <header className="card-header">
                        <p className="card-header-title">
                            {title}
                            <p className="has-small-text has-text-info ml-3 has-text-weight-light">  {info} </p>
                        </p>
                        <div className="card-header-icon" aria-label="more options">
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

            </Link>
        </div>
    )
}