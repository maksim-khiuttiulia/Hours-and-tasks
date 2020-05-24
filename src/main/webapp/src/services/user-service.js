import API from './API'

export async function login(username, password) {
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
}

export function logout() {
    sessionStorage.removeItem("token")
    localStorage.removeItem("token")
}

export function isLoggedIn() {
    let token = sessionStorage.getItem('token');
    if (!token) {
        token = localStorage.getItem('token');
    }
    if (!token) {
        return false;
    }
    return true
}