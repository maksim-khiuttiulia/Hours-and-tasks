import API from './API'

export async function getAllProjects() {
    try {
        let response = await API.get("/projects");
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}

export async function getTasksInProject(projectid) {
    try {
        let response = await API.get(`/projects/${projectid}/tasks`);
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