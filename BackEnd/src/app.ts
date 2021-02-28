import express  from 'express'
import cors from 'cors'
import {router as users} from './routes/users'
import {router as interactions} from './routes/interactions'
//import {router as interactions} from './routes/interactions'
//import {router as interactionsGroup} from './routes/interactionsGroup'

const app = express()
const bodyParser = require ('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'token',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "http://localhost:4200",
    preflightContinue: false,
  };
app.use(cors(options))
module.exports = app.listen(3004)

app.use('/users',users)
app.use('/users/interactions',interactions)
// app.use('/users/groups',)