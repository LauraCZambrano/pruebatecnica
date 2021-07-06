require('../config');
require('../database/index');
const {signup, signin} = require('../controllers/authController');

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = (body) => {
    return {body};
};


describe('Register', () => {
    
    test('should 401 if wrong data', async () => {
        const req = mockRequest({first_name: "Jane", last_name: "Doe", email: "jane@doe.com"});
        const res = mockResponse();
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    test('should 200 if correct data', async () => {
        const req = await mockRequest({
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'jane@doe.com',
            password: 'qwe123.',
        });
        const res = await mockResponse();
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test('should 400 if email already exists', async () => {
        const req = await mockRequest({
            first_name: 'Laura',
            last_name: 'Zambrano',
            email: 'laurac3108@gmail.com',
            password: 'qwe456.',
        });
        const res = await mockResponse();
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });
});


describe('Login', () => {
    
    test('should 401 if wrong email or password', async () => {
        const req = mockRequest({
            email: 'jane@doe.com',
            password: '123456.',
        });
        const res = mockResponse();
        await signin(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    test('should 200 if correct email and password', async () => {
        const req = await mockRequest({
            email: 'laurac3108@gmail.com',
            password: 'qwe123.',
        });
        const res = await mockResponse();
        await signin(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});