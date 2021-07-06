//MODELS
const {saveProject} = require('../database/projects');


exports.validateProject = async (projectData, user_id) => {
    if (!projectData.name || !projectData.description) {
        return;
    }
    projectData.user_id = user_id

    //create project
    projectData.id = await saveProject(projectData);
    return projectData;
};