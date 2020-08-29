import {proveedorEndPoint } from './config/endpoints';
import { authHeader } from './auth.service';



export async function listarProvedores(id){
  let res = await fetch(proveedorEndPoint,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}

export async function cambiarComision(data){
  
  let res = await fetch( proveedorEndPoint,{
    method:'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  let respose = res.json();

  return respose;
}