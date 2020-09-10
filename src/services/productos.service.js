import { server } from './config/endpoints';
import { productoEndPoint } from './config/endpoints';
import { authHeader, getUserAuth } from './auth.service';

export async function getProducts() {
  let res = await fetch(productoEndPoint, {
    method: 'GET',
    headers: {
      Authorization: authHeader()
    }
  }
  );
  let response = await res.json();
  return response;

}

export async function getProduct(id) {
  let res = await fetch(`${productoEndPoint}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: authHeader()
    }
  });
  let response = await res.json();
  let row ={};
  row['id'] = response[0];
  row['modelo'] = response[1];
  row['precio'] = response[2];
  row['proveedor'] = response[3];
  row['descripcion'] = response[4];
  row['urlImagen'] = response[5];
  return row;
}

export async function getProductsByBrand(id) {
  let res = await fetch(`${productoEndPoint}-marca/${id}`, {
    method: 'GET',
    headers: {
      Authorization: authHeader()
    }
  });
  let response = await res.json();
  return response;
}

export async function getProductsByModel(id) {
  let res = await fetch(`${productoEndPoint}-modelo/${id}`, {
    method: 'GET',
    headers: {
      Authorization: authHeader()
    }
  });
  let response = await res.json();
  return response;
}

export async function getProductsByProvider() {
  let email = getUserAuth().email;
  let res = await fetch(`${productoEndPoint}-proveedor/${email}`, {
    method: 'GET',
    headers: {
      Authorization: authHeader()
    }
  });
  let response = await res.json();
  return await setResponse(response);
}

export async function getProductsByPrice(price) {
  let res = await fetch(`${productoEndPoint}-precio/${price}`, {
    method: 'GET',
    headers: {
      Authorization: authHeader()
    }
  });
  let response = await res.json();
  return response;
}

export async function getProductsByParam(param) {
  let res = await fetch(`${server}/producto/${param}`, {
    method: 'GET',
    headers: {
      Authorization: authHeader()
    }
  });
  let response = await res.json();
  return response;
}

export async function saveProduct(data) {
  console.log(data);
  let res = await fetch(productoEndPoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  let respose = res.json();

  return respose;
}

export async function updateProduct(id, data) {
  console.log(data);
  let res = await fetch(`${productoEndPoint}/${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    }
  });
  let respose = res.json();

  return respose;
}

async function setResponse(r) {
  let data = [];
  if (Object.keys(r).length > 0) {
    for (let pro of r) {
      let row = {};


      row['id'] = pro[0];
      row['modelo'] = pro[1];
      row['precio'] = pro[2];
      row['proveedor'] = pro[3];
      row['descripcion'] = pro[4];
      row['urlImagen'] = pro[5];

      data.push(row);
    }

    return data;
  }
}