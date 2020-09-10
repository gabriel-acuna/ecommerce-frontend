import Home from './components/Home';
import Login from './components/Login';
import AdminHome from './components/admin/index';
import ProviderHome from './components/provider/index';
import CostumerHome from './components/costumer/index';
import Edit from './components/shared/marcas/Edit';
import EditM   from './components/shared/modelos/Edit';
import New from './components/shared/marcas/New';
import Providers from './components/admin/Providers';
import Modelo from './components/shared/modelos/Modelo';
import Modelos from './components/shared/modelos/Modelos';
import EditProvider from './components/admin/EditProvider';
import NewProduct from './components/provider/Product';
import ProductsByProvider from './components/provider/Products';
import EditProduct from './components/provider/EditProduct';


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
    component: Providers
  }, 
  {
    path: "/providers/:id",
    component: EditProvider
  },
  {
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
  {
    path:'/products/new',
    component:NewProduct

  },
  {
    path:'/products-managment',
    component: ProductsByProvider
  },{
    path: '/products-managment/:id',
    component: EditProduct
  }


];