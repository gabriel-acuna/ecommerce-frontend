import React, { Fragment, useEffect } from 'react';
import Header from './Header';
import {BrowserRouter, Route} from 'react-router-dom';
import SignUp from './SignUp';
import { routes } from '../routes';
import { isTokenValid, logout } from '../services/auth.service';


export default (props) => {
    useEffect(() => {
        
        if (!isTokenValid()) {
            logout();
        } 
    },[]);
    console.log(isTokenValid());
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
               
                <main>{props.children}
              
                    {routes.map((r,i)=>(
                        <Route component={r.component} exact path={r.path} key={i}/>
                    ))}
                    <Route  exact path="/sing-up-provider"  component={() => <SignUp isProvider={true} />}/>
                    <Route  exact path="/sing-up"  component={() => <SignUp  isProvider={false}/>}/>
                </main>
            </Fragment >
        </BrowserRouter>
    )
}