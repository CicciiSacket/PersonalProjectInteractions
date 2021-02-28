import express from 'express' 
import {IUsers} from '../interfaces/users'
import bluebird  from 'bluebird'
import {validateRegister,passwordRequire,findUser} from '../middle/middleware'
const bcrypt = require('bcrypt')
const users = require('/Users/studente/Desktop/MsgProject/BackEnd/users.json')
let fs = bluebird.promisifyAll(require('fs'))
export const router = express.Router()

router.get('', (_,res)=>{ //lista di tutti gli utenti!
    res.json(users.map((user:{userName: string}) => user.userName))
})

router.post('',validateRegister,async({body:{prefix,phoneNumber,userName,password,interactions = []}},res)=>{ //aggiunta utente, solo se il numero di cellulare non è già registrato!
    if(!(users.find((item: { phoneNumber: number }) => item.phoneNumber === phoneNumber))){
        password = bcrypt.hashSync(password, 10)
        let user : IUsers = {
            prefix,
            phoneNumber,
            userName,
            password,
            interactions
        }
        users.push(user)
        await fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        return res.status(201).json({message:"Insert!"})
    }
    else{
        res.status(400).json({message:"Phone number already exist!"})
    }
})

router.get('/:phoneNumber', findUser,passwordRequire,async(_,res)=>{ //login![phonenumber come params e password come body]
    let {user} = res.locals
    res.status(200).json({PhoneNumber:user.phoneNumber,Interactions:user.interactions})
})

router.delete('/:phoneNumber',findUser,passwordRequire,async(_,res)=>{ //rimozione di utente solo dopo il loggin con numero di telefono e password![phonenumber come params e password come body]
    let {user} = res.locals
    users.splice(users.indexOf(user), 1)
    await fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(200).json({message:"Deleted!"})
})

router.put('/:phoneNumber',findUser,passwordRequire,async({body:{newPassword}},res)=>{ //modifica della password![phonenumber come params e password come body]
    let {user} = res.locals
    newPassword = bcrypt.hashSync(newPassword, 10)
    user.password = newPassword
    await fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(200).json({message:"Changed!"})
})
