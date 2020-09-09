import { marcasEndPoint } from './config/endpoints';
import { authHeader } from './auth.service';

export async function listarMarcas(){
  let res = await fetch(marcasEndPoint,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}

export async function getMarca(id){
  let res = await fetch(`${marcasEndPoint}/${id}`,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}
export async function resgistrarMarcar(data){
  let res = await fetch(marcasEndPoint,{
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

export async function modificarMarca(id,data){
 
  let res = await fetch(`${marcasEndPoint}/${id}`,{
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