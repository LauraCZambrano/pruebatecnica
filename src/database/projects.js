const {Project} = require('./index');

//CREATE
exports.saveProject = async (projectData) => {
    let projectDb = Project.doc(); 
    await projectDb.set(projectData);
    return projectDb.id;
}

//FIND USER'S PROJECTS
exports.findProjectsFromUser = async (user_id) => {
    let result = await Project.where('user_id', '==', user_id).select('name').get();
    let projects = [];
    for(let i=0; i<result.docs.length; i++){
        projects[i] = result.docs[i].data();
        projects[i].id = result.docs[i].id;
    }
    return projects;
}

//FIND BY ID
exports.findProjectById = async (id) => {
    let result = await Project.doc(id).get();
    let project = result.data();
    if(project){
        project.id = result.id;
        return project;
    }
    return;
}

//UPDATE
exports.updateProject = async (id, projectData) => {
    await Project.doc(id).update(projectData);
    return true;
}

//DELETE
exports.deleteProject = async (id) => {
    await Project.doc(id).delete();
    return true;
}

//DELETE ALL USERS PROJECTS
exports.deleteUserProjects = async (user_id) => {
    let projects = Project.where('user_id', '==', user_id);
    projects.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        });
    });
    return true;
}