import { server } from './config/endpoints';

import { authHeader, getUserAuth } from './auth.service';

export async function getTotal(){
    let email = getUserAuth().email;
    let resp = await fetch(`${server}/ventas/${email}`, {
        method: 'GET',
        headers: {
          Authorization: authHeader()
        }
      });
      let response = await resp.json();
      return response;
}

export function createShoppingKart(){
    localStorage.setItem("kart", JSON.stringify([]));
}

export function shoppingKartItems(){
    if (localStorage.getItem('kart')) {
        return JSON.parse(localStorage.getItem('kart')).length;
    } else {
        return 0
    }
}
