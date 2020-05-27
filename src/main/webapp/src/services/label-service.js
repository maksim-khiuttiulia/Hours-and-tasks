import API from './API'

export async function getLabelsInProject(projectId) {
    let response = await API.get(`/projects/${projectId}/labels`);
    return await response.data
}