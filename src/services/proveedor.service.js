import {proveedorEndPoint } from './config/endpoints';
import { authHeader } from './auth.service';



export async function listarProvedores(){
  let res = await fetch(proveedorEndPoint,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}

export async function obtenerProvedor(id){
  let res = await fetch(`${proveedorEndPoint}/${id}`,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}

export async function cambiarComision(id,data){
  
  let res = await fetch(`${proveedorEndPoint}/${id}`,{
    method:'POST',
    body: data,
    headers:{
      'Content-Type': 'text/plain',
      Authorization: authHeader()
    }
  });
  let respose = res.json();

  return respose;
}