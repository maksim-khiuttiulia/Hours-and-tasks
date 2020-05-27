import API from './API'

export async function getAllTasks(page, size, done) {
    let url = `/tasks?`
    if (page >= 0 && size >= 0) {
        url += `page=${page}&size=${size}`
    }
    if (done === true) {
        url += `&done=true`
    }
    if (done === false) {
        url += `&done=false`
    }
    let response = await API.get(url);
    return await response.data
}

export async function saveNewTask(task) {
    let response = await API.post(`/tasks`, task)
    let data = await response.data
    return data;
}

export async function deleteTask(task) {
    await API.delete(`/tasks/${task.id}`)
}

export async function changeTaskStatus(task) {
    if (task.done === true) {
        return await API.put(`/tasks/${task.id}/done`, task)
    } else {
        return await API.put(`/tasks/${task.id}/notDone`, task)
    }
}