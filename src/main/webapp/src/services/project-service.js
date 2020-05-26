import API from './API'

export async function getAllProjects(page, size, sortBy, orderBy) {
    try {
        let response = await API.get("/projects");
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}

export async function getTasksInProject(projectid, page, size, done, sortBy, orderBy) {
    let url = `/projects/${projectid}/tasks?`
    if (page >= 0 && size >= 0){
        url += `page=${page}&size=${size}`
    } 
    if (done === true){
        url += `&done=true`
    }
    if (done === false){
        url += `&done=false`
    }
    if (sortBy){
        url += `&sort=${sortBy}`
        if (orderBy){
            url += `,${orderBy}`
        }
    }
    try {
        let response = await API.get(url);
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}

export async function getDoneTasksInProject(projectid) {
    try {
        let response = await API.get(`/projects/${projectid}/tasks?done=true`);
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}

export async function getNotDoneTasksInProject(projectid) {
    try {
        let response = await API.get(`/projects/${projectid}/tasks?done=false`);
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}