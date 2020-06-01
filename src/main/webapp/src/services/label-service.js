import API from './API'

export async function getLabelsInProject(projectId) {
    let response = await API.get(`/projects/${projectId}/labels`);
    return await response.data
}

export async function getLabelColors() {
    let response = await API.get(`/task-labels/colors`);
    return await response.data
}

export async function addLabelToProject(projectId, label) {
    let response = await API.post(`/projects/${projectId}/labels`, label);
    return await response.data
}