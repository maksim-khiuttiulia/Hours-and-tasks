import API from './API'

export async function login(username, password) {
    try {
        let request = {
            username: username,
            password: password
        }
        let response = await API.post("/auth/login", request);
        let data = await response.data
        if (data.token) {
            sessionStorage.setItem('token', data.token)
        }
        return true
    } catch (error) {
        console.error(error)
    }
    return false;
}

export async function isLogged() {
    let token = sessionStorage.getItem('token');
    if (!token) {
        token = localStorage.getItem('token');
    }
    if (!token) {
        return false;
    }
    let response = await API.get("/auth/authValid")
    let data = await response.data;
    return data.validAuth === true;
}