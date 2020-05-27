import API from './API'

export async function getAllProjects(page, size, sortBy, orderBy) {
    let response = await API.get("/projects");
    return await response.data
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
    let response = await API.get(url);
    return await response.data
}
