import API from './API'

export async function getLabels(userId) {
    try {
        let response = await API.get("/task-labels");
        let data = await response.data
        console.log(data)
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}