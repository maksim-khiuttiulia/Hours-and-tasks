import API from './API'

export async function getAllProjects(page, size, sortBy, orderBy) {
    let response = await API.get("/projects");
    return await response.data
}

export async function getProject(projectid){
    let response = await API.get(`/projects/${projectid}`);
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

export async function createProject(project){
    let response = await API.post(`/projects/`, project);
    return await response.data
}

export async function updateProject(projectid, project){
    let response = await API.put(`/projects/${projectid}`, project);
    return await response.data
}

export async function deleteProject(projectid){
    let response = await API.delete(`/projects/${projectid}`);
    return await response.data
}