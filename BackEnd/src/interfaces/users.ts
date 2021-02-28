import {IInteraction} from '../interfaces/interaction'
export interface IUsers {
    prefix : "+39" | "+01",
    phoneNumber:number //univoco 
    userName:string
    password:string //per accesso da client
    interactions: IInteraction[]
}