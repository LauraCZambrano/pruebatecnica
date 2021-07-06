require('../database/index');
const {create, show, showOne, updateProject} = require('../controllers/projectController');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = (user, id, body) => {
    return {
        user,
        body,
        params: { id }
    };
};


let user = {
    id: 'B0rGvY7DOl8IzRCATcED',
    first_name: 'Laura',
    last_name: 'Zambrano',
    email: 'laurac3108@gmail.com'
};


describe('Create Project', () => {
    
    test('should 400 if session data is not set', async () => {
        const req = mockRequest();
        const res = mockResponse();
        await create(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should 200 if session data is set', async () => {
        const req = await mockRequest(user, null, {
            name: 'My Project',
            description: 'Description of my project'
        });
        const res = await mockResponse();
        await create(req, res);
        
        expect(res.status).toHaveBeenCalledWith(201);
    });
});


describe('Show All My Projects', () => {
    
    test('should 400 if session data is not set', async () => {
        const req = mockRequest();
        const res = mockResponse();
        await show(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should 200 if session data is set', async () => {
        const req = await mockRequest(user);
        const res = await mockResponse();
        await show(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


describe('Show One Project', () => {
    test('should 400 if not id params', async () => {
        const req = mockRequest(user, null);
        const res = mockResponse();
        await showOne(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should 400 if id not found', async () => {
        const req = mockRequest(user, '60e33a9e3697c549e8af94b7');
        const res = mockResponse();
        await showOne(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should 200 if session data is set', async () => {
        const req = await mockRequest(user, 'ZvQPlSlC7jgSCO8dueYa');
        const res = await mockResponse();
        await showOne(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


describe('Update Project', () => {
    test('should 200 if session data is set', async () => {
        const req = await mockRequest(user, 'ZvQPlSlC7jgSCO8dueYa', {
            name: "Project Edit"
        });
        const res = await mockResponse();
        await updateProject(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});