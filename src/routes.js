import React from 'react';
import  Home  from './components/Home';
import  Login from './components/Login';
import AdminHome from './components/admin/index';
import ProviderHome from './components/provider/index';


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