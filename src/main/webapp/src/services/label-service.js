import API from './API'

export async function getAllLabels(userId) {
    try {
        let response = await API.get("/task-labels");
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}