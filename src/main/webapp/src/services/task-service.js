import API from './API'

export async function getAllTasks() {
    try {
        let response = await API.get("/tasks");
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}

export async function saveNewTask(task) {
    await API.post(`/tasks`, task)
}

export async function deleteTask(task) {
    await API.delete(`/tasks/${task.id}`)
}

export async function changeTaskStatus(task) {
    if (task.done){
        await API.put(`/tasks/${task.id}/done`, task)
    } else {
        await API.put(`/tasks/${task.id}/notDone`, task)
    }

}