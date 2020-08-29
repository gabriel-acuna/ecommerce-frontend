import React from 'react';
import { Link } from 'react-router-dom';
import { getUserAuth, logout, isCostumer, isProvider, isAdmin } from '../services/auth.service';
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { FaAngleDown, FaUserCog,  FaSignOutAlt, FaShoppingBag } from 'react-icons/fa';
export default (props) => {

    const history = useHistory();
    const [showLoginButton, setShowLoginButton] = React.useState(true)
    let location = useLocation();

    useEffect(() => {

        if (Object.keys(getUserAuth()).length === 0 && location.pathname === '/login') {
            setShowLoginButton(false)
        } else if (Object.keys(getUserAuth()).length === 0 && location.pathname !== '/login') {
            setShowLoginButton(true)
        }
    }, [location.pathname]);


    function login(event) {

        history.push("/login");
    }

    function singOut(event) {
        logout();
        history.push('/')
    }

    let user = getUserAuth().firstName;

    return (


        <section className="hero has-background-dark">
            <div className="hero-body">
                <div className="container">
                    {
                        Object.keys(getUserAuth()).length === 0 &&
                        < Link to="/"><h1 className="title has-text-light">
                            Site
                        </h1></Link>
                    }
                     {
                        Object.keys(getUserAuth()).length > 0 && isCostumer() && !isAdmin() &&
                        < Link to="/costumer"><h1 className="title has-text-light">
                            Site
                        </h1></Link>
                    }
                     {
                        Object.keys(getUserAuth()).length > 0 && isProvider() &&
                        < Link to="/provider"><h1 className="title has-text-light">
                            Site
                        </h1></Link>
                    }
                    {
                        Object.keys(getUserAuth()).length > 0 && isAdmin()  &&
                        < Link to="/admin"><h1 className="title has-text-light">
                            Site
                        </h1></Link>
                    }
                    {
                        Object.keys(getUserAuth()).length === 0
                        && <Link to="sing-up-provider" className="is-pulled-left button is-small is-primary is-outlined mr-4"> ¿Quieres vender?</Link>

                    }
                    {
                        Object.keys(getUserAuth()).length === 0
                        && <Link to="sing-up" className="button is-link is-small is-outlined mr-4"> ¿Quieres comprar?</Link>
                    }
                    {
                        Object.keys(getUserAuth()).length === 0 && showLoginButton
                        && <button className="is-pulled-right is-small button is-success is-outlined" onClick={event => login(event)}> Iniciar sesión</button>
                    }

                    {
                        Object.keys(getUserAuth()).length > 0
                        && <div className="dropdown is-hoverable is-pulled-right is-small is-primary">
                            <div className="dropdown-trigger">
                                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                                    <span> Hola, {user}</span>
                                    <span className="icon is-small is-pulled-right">
                                        <FaAngleDown />
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                <div className="dropdown-content">
                                    <a className="dropdown-item">
                                        <span> Perfil</span>
                                        <span className="icon is-small is-pulled-right">
                                            <FaUserCog />
                                        </span>


                                    </a>
                                    {
                                        isCostumer() && 
                                        <Link className="dropdown-item" to="/costumer">
                                        <span> Comprar</span>
                                        <span className="icon is-small is-pulled-right">
                                            <FaShoppingBag />
                                        </span>


                                    </Link>
                                    }
                                    <a className="dropdown-item" onClick={event => singOut(event)}>
                                        <span>Cerrar sesión</span>
                                        <span className="icon is-small is-pulled-right">
                                            <FaSignOutAlt />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>




                    }





                </div>

            </div>

        </section >


    )
}