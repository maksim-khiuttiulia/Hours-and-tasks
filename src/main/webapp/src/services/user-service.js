import API from './API'

export async function login(username, password) {
    try {
        let request = {
            username : username,
            password : password
        }
        let response = await API.post("/auth/login", request);
        let data = await response.data
        if (data.token){
            sessionStorage.setItem('token', data.token)
        }
        return true
    } catch (error) {
        console.error(error)
    }
    return false;
}

export function isLogged(){
    if (sessionStorage.getItem('token')){
        return true;
    }
    if (localStorage.getItem('token')){
        return true;
    }
    return false;
}