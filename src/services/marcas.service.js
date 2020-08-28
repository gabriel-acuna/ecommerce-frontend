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