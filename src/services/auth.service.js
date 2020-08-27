import { signinEndPoint, registerEndPoint } from './config/endpoints';



export async function login(credentials) {
    try {
        let response = await fetch(signinEndPoint, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let resp = await response.json();
        if (resp.accessToken) {
            localStorage.setItem("auth", JSON.stringify(resp));
        }

        return resp;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}
export async function register(userData) {
    try {
        let response = await fetch(registerEndPoint, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'

            }
        });
        let resp = await response.json();
        return resp;
    } catch (error) {
        throw new Error(error);
    }

}

export function logout() {
    localStorage.removeItem("auth");
}

export function authHeader() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth && auth.token) {
        return { Authorization: `Bearer ${auth.token}` };
    } else {
        return {};
    }
}

export function getUserAuth() {
    if (localStorage.getItem('auth')) {
        return JSON.parse(localStorage.getItem('auth'));
    } else {
        return {}
    }
}

export function isCostumer() {

    let auth = getUserAuth();

    if (auth.roles) {
        let resp = auth.roles.find(r => r === 'ROLE_USER');
        return resp !== undefined
    }
}

export function isProvider() {

    let auth = getUserAuth();

    if (auth.roles) {
        let resp = auth.roles.find(r => r === 'ROLE_PROVIDER');
        return resp !== undefined
    }

}
