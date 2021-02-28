import express from 'express' 
import {IInteraction} from '../interfaces/interaction'
import bluebird  from 'bluebird'
import {passwordRequire,findUser} from '../middle/middleware'
const bcrypt = require('bcrypt')
const users = require('/Users/studente/Desktop/MsgProject/BackEnd/users.json')
const interactions = require('/Users/studente/Desktop/MsgProject/BackEnd/interactions.json')
let fs = bluebird.promisifyAll(require('fs'))
export const router = express.Router()

router.post('/:phoneNumber',findUser,passwordRequire ,async({body:{userTwoPhoneNumber,message}},res) =>{//scambio di messaggi tra due utenti
    let {user} = res.locals
    let userReceive = users.find((item: { phoneNumber: string }) => item.phoneNumber == userTwoPhoneNumber)
    if(!userReceive){return res.status(404).json({message:"User not found"})}
    user.interactions.push({To:userReceive.phoneNumber,message: message})
    userReceive.interactions.push({From:userReceive.phoneNumber,message: message})
    let interaction : IInteraction = {
        userSend : user.phoneNumber,
        userReceive : userReceive.phoneNumber,
        message : message
    }
    interactions.push(interaction)
    await fs.writeFileSync('interactions.json', JSON.stringify(interactions, null, 2));
    await fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    return res.status(201).json({message:"Message Send!"})
    
})