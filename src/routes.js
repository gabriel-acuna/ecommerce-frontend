import React from 'react';
import  Home  from './commponents/Home';
import  Login from './commponents/Login';
import AdminHome from './commponents/admin/index';
import ProviderHome from './commponents/provider/index';


export const routes =  [
    {
      path: "/",
      component: Home
    },
    {
      path: "/login",
      component: Login
      
    },{
      path:"/admin",
      component:AdminHome
    },
    {
      path:"/provider",
      component: ProviderHome
    }
  ];