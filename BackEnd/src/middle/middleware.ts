const bcrypt = require('bcrypt')
const users = require('/Users/studente/Desktop/MsgProject/BackEnd/users.json')

const validPrefix = ["+39"]
const prefixValidate = (prefix : string) =>{
    if(validPrefix.includes(prefix)){
        return true
    }
}

export let validateRegister = ({body:{prefix,phoneNumber,userName,password}}:any,res:any,next:any) => {
    if((password.length > 6) && prefixValidate(prefix) && userName && (!isNaN(phoneNumber))){
        next()
    }
    else{
        return res.status(400).json({message:"Registration not complete!"})
    }
}

export let passwordRequire = ({body,params}:any,res:any,next:any) =>{
    let user = users.findIndex((item: { phoneNumber: string }) => item.phoneNumber == params.phoneNumber)
    if(bcrypt.compareSync(body.password,users[user].password)){
        res.locals.user = users[user]
        next()
    }
    else{
        return res.status(403).json({message:"Wrong password!"})
    }
}

export let findUser = ({params}:any,res:any,next:any) =>{
    let user = users.findIndex((item: { phoneNumber: string }) => item.phoneNumber == params.phoneNumber)
    if(users.includes(users[user])){
        res.locals.user = users[user]
        next()
    }
    else{
       res.status(404).json({message:"User not found"})
    }
}