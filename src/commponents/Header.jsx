import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from 'react';
export default (props) => {
    const context = useContext(AuthContext);
    const history = useHistory();
    const [showLoginButton, setShowLoginButton] = React.useState(true)
    let location = useLocation();

    useEffect(() => {
        if (Object.keys(context.auth).length === 0 && location.pathname === '/login') {
            setShowLoginButton(false)
        } else if (Object.keys(context.auth).length === 0 && location.pathname !== '/login') {
            setShowLoginButton(true)
        }
    }, [context.auth, location.pathname]);


    function login(event) {

        history.push("/login");
    }


    return (


        <section className="hero has-background-dark">
            <div className="hero-body">
                <div className="container">
                    <Link to="/"><h1 className="title has-text-light">
                        Site
                        </h1></Link>
                    {
                        Object.keys(context.auth).length === 0
                        && <Link to="sing-up-provider" className="is-pulled-left button is-small is-primary is-outlined mr-4"> ¿Quieres vender?</Link>

                    }
                    {
                        Object.keys(context.auth).length === 0
                        && <Link to="sing-up" className="button is-link is-small is-outlined mr-4"> ¿Quieres comprar?</Link>
                    }
                    {
                        Object.keys(context.auth).length === 0 && showLoginButton
                        && <button className="is-pulled-right is-small button is-success is-outlined" onClick={event => login(event)}> Iniciar sesión</button>
                    }







                </div>

            </div>
        </section>


    )
}