import React, { Fragment, useEffect } from 'react';
import Header from './Header';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import SignUp from './SignUp';
import { routes } from '../routes';
import { isTokenValid, logout } from '../services/auth.service';
import Marcas from './shared/marcas/List';


export default (props) => {
    useEffect(() => {
        
        if (!isTokenValid()) {
            logout();
        } 
    },[]);
   
    return (
        <BrowserRouter>
            <Fragment>
                <Header />
               
                <main>{props.children}
                <Switch>
                    {routes.map((r,i)=>(
                        <Route component={r.component} exact path={r.path} key={i}/>
                    ))}
                    <Route  exact path="/sing-up-provider"  component={() => <SignUp isProvider={true} />}/>
                    <Route  exact path="/sing-up"  component={() => <SignUp  isProvider={false}/>}/>
                    <Route exact path="/brands" component={()=><Marcas/>} />
                </Switch>
                </main>
            </Fragment >
        </BrowserRouter>
    )
}