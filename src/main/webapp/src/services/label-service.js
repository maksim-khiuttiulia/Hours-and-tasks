import API from './API'

export async function getLabelsInProject(projectId) {
    try {
        let response = await API.get(`/projects/${projectId}/labels`);
        let data = await response.data
        return data;
    } catch (error) {
        console.error(error)
    }
    return [];
}