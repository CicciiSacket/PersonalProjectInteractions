import request from 'supertest'
const app = require('../app'); 

describe("INTERACTIONS",async () => {
    it('interaction to two user 200',(done)=>{//interaction without error
        request(app).post('/users/interactions/3337575036').send({
            "password":"ciao111",
            "userTwoPhoneNumber":3337575037,
            "message":"Mbare che dici?"
        }).expect(201,done);
    })
    it('interaction to two user 404',(done)=>{//usersend error
        request(app).post('/users/interactions/33375750399').send({
            "password":"ciao111",
            "userTwoPhoneNumber":3337575037,
            "message":"Mbare che dici?"
        }).expect(404,done);
    })
    it('interaction to two user 404',(done)=>{//userreceive error
        request(app).post('/users/interactions/3337575036').send({
            "password":"ciao111",
            "userTwoPhoneNumber":33375750399,
            "message":"Mbare che dici?"
        }).expect(404,done);
    })  
    it('interaction to two user 403',(done)=>{//password error
        request(app).post('/users/interactions/3337575036').send({
            "password":"ciao1",
            "userTwoPhoneNumber":3337575037,
            "message":"Mbare che dici?"
        }).expect(403,done);
    })
})