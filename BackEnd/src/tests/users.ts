import request from 'supertest'
const app = require('../app'); 

describe("USERS",async () => {
    it('list of total users',(done)=>{
        request(app).get('/users').expect(200,done);
    })
    it('insert new user 201',(done)=>{
        request(app).post('/users').send({
            "prefix": "+39",
            "phoneNumber": 3337575035,
            "userName": "cicci",
            "password": "ciao111"
        }).expect(201,done);
    })
    it('insert new user con prefix error 400',(done)=>{ 
        request(app).post('/users').send({
            "prefix": "+3",
            "phoneNumber": 3337575035,
            "userName": "cicci",
            "password": "ciao111"
        }).expect(400,done);
    })
    it('insert new user con phoneNumber error 400',(done)=>{
        request(app).post('/users').send({
            "prefix": "+39",
            "phoneNumber": "pippo",
            "userName": "cicci",
            "password": "ciao111"
        }).expect(400,done);
    })
    it('insert new user con userName error 400',(done)=>{
        request(app).post('/users').send({
            "prefix": "+3",
            "phoneNumber": 3337575035,
            "password": "ciao111"
        }).expect(400,done);
    })
    it('insert new user con password error 400',(done)=>{
        request(app).post('/users').send({
            "prefix": "+39",
            "phoneNumber": 3337575035,
            "userName": "cicci",
            "password": "ciao1"
        }).expect(400,done);
    })
    it('login users 200',(done)=>{
        request(app).get('/users/3337575037').send({"password":"ciao1111"}).expect(200,done);
    })
    it('login users 404',(done)=>{
        request(app).get('/users/333757503999').send({"password":"ciao111"}).expect(404,done);
    })
    it('login users 401',(done)=>{
        request(app).get('/users/3337575036').send({"password":"ciao"}).expect(403,done);
    })
    it('delete users 200',(done)=>{
        request(app).delete('/users/3337575035').send({"password":"ciao111"}).expect(200,done);
    })
    it('delete users 404',(done)=>{
        request(app).delete('/users/333757503999').send({"password":"ciao111"}).expect(404,done);
    })
    it('delete users 403',(done)=>{
        request(app).delete('/users/3337575036').send({"password":"ciao1"}).expect(403,done);
    })
    it('changed password users 200',(done)=>{
        request(app).put('/users/3337575036').send({"password":"ciao111","newPassword":"ciao111"}).expect(200,done);
    })
    it('changed password users 404',(done)=>{
        request(app).put('/users/333757503999').send({"password":"ciao111","newPassword":"ciao1111"}).expect(404,done);
    })
    it('changed password users 403',(done)=>{
        request(app).put('/users/3337575036').send({"password":"ciao1","newPassword":"ciao1111"}).expect(403,done);
    })

})