import { notifiacionEndPoint } from './config/endpoints'
import { authHeader, getUserAuth } from './auth.service';

export async function nuevasNotificaciones(id){
    let email = getUserAuth().email;
    let res = await fetch(`${notifiacionEndPoint}/recientes/${email}`,{
        method:'GET',
        headers:{
          Authorization: authHeader()
        }
    });
    let response = await res.json();
    return response;
  }