import API from './API'

export async function getLabels(userId) {
    let response = await API.get("/task-labels");
    return await response.data
}