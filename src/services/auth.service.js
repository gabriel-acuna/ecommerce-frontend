import { signinEndPoint, registerEndPoint } from './config/endpoints';



export async function login( context,credentials ) {
    try {
        let response = await fetch(signinEndPoint, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let resp = await response.json;
        context.setAuth(resp);
    } catch (error) {
        throw new Error(error);
    }

}
export async function register( context,userData ) {
    try {
        let response = await fetch(registerEndPoint, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json;
    } catch (error) {
        throw new Error(error);
    }

}

export function logout(context){
    context.setAuth({});
}

export function authHeader(context) {
    
  
    if (context.getAuth() && context.getAuth().token) {
      // for Node.js Express back-end
      return { Authorization: `Bearer ${context.getAuth().token}`  };
    } else {
      return {};
    }
  }


