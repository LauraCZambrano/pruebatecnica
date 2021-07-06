//VALIDATIONS
const validation = require('../validations/project');

//MODELS
const {findProjectsFromUser, findProjectById, updateProject, deleteProject} = require('../database/projects');


//CREATE PROJECT
exports.create = async (req, res) => { 
    //form data is received
    let body = req.body;

    try {
        let project = await validation.validateProject(body, req.user.id);
        //if all goes well, return the data
        return res.status(201).json({
            ok: true,
            project
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
}


//FIND ONE PROJECT
exports.showOne = async (req, res) => { 
    //id params
    let id = req.params.id;

    try {
        let project = await findProjectById(id);
        if(!project){
            return res.status(400).json({
                ok: false,
                error: 'Project not found',
            });
        }
        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            project
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}


//FIND USERS PROJECTS
exports.show = async (req, res) => { 
    //user session
    let user = req.user;

    try {
        let projects = await findProjectsFromUser(user.id);
        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            projects
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}


//UPDATE PROJECT
exports.updateProject = async (req, res) => { 
    //id params
    let id = req.params.id;

    let body = req.body;

    try {
        await updateProject(id, body);
        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            message: "Project Updated"
        });
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}


//DELETE PROJECT
exports.deleteProject = async (req, res) => { 
    //id params
    let id = req.params.id;

    try {
        await deleteProject(id);
        //if all goes well, return the data
        return res.status(200).json({
            ok: true,
            message: "Deleted Project"
        });
    } catch (err) {
        return res.status(400).json({
            ok: false,
            error: err
        });
    }
}