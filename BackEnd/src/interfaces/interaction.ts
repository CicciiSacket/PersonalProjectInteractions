import {IUsers} from './users'

export interface IInteraction{
    userSend: IUsers
    userReceive: IUsers
    message : String[]
}