import { modeloEndPoint } from './config/endpoints';
import { authHeader } from './auth.service';

export async function listarModelosPorMarca(id){
  let res = await fetch(`${modeloEndPoint}-marca/${id}`,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}

export async function listarModelos(id){
  let res = await fetch(modeloEndPoint,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}

export async function resgistrarModelo(data){
  console.log(data);
  let res = await fetch(modeloEndPoint,{
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

export async function getModelo(id){
  let res = await fetch(`${modeloEndPoint}/${id}`,{
      method:'GET',
      headers:{
        Authorization: authHeader()
      }
  });
  let response = await res.json();
  return response;
}

export async function modificarModelo(id,data){
 
  let res = await fetch(`${modeloEndPoint}/${id}`,{
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