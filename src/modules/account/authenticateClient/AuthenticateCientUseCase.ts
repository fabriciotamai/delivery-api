import { prisma} from '../../../database/prismaClient';
import { compare } from 'bcrypt';

import { sign } from 'jsonwebtoken';

interface IAuthenticateUser{
    username:string;
    password:string;

}

export class AuthenticateClientUseCase {
    async execute({username, password}:IAuthenticateUser){

        const client = await prisma.clients.findFirst({
            where:{
                username
            }

        })

        if(!client){
            throw new Error(`Username or password invalid!`)
        }

        const passwordMatch = await compare(password, client.password)

        if(!passwordMatch){
            throw new Error(`Username or password invalid!`)
        }

        const token = sign({username},"ff6189891a471d299079010ad5461b57", { 
            subject:client.id,
            expiresIn:"1d"

        
        } )
        return token


        





        
    }
}