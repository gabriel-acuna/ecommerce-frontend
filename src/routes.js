import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import AdminHome from './components/admin/index';
import ProviderHome from './components/provider/index';
import CostumerHome from './components/costumer/index';
import Edit from './components/shared/marcas/Edit';
import EditM   from './components/shared/modelos/Edit';
import New from './components/shared/marcas/New';
import Provider from './components/admin/Provider';
import Modelo from './components/shared/modelos/Modelo';
import Modelos from './components/shared/modelos/Modelos';




export const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login

  }, {
    path: "/admin",
    component: AdminHome
  },
  {
    path: "/provider",
    component: ProviderHome
  },
  {
    path: "/costumer",
    component: CostumerHome
  },

  {
    path: "/brand",
    component: New
  },
  {
    path: "/brand/:id",
    component: Edit
  },
  {
    path: "/providers",
    component: Provider
  },{
    path:"/model/:marca",
    component:Modelo
  },
  {
    path:"/models/:marca",
    component:Modelos
  },
  {
    path:"/mod/:id",
    component:EditM
  },


];