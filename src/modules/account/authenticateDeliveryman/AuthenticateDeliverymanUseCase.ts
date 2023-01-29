import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman{
    username:string;
    password:string;

}


export class AuthenticateDeliverymanUseCase{
    async execute({username, password}: IAuthenticateDeliveryman) {

        const deliveryman = await prisma.deliveryman.findFirst({
            where:{
                username
            }
        })

        if(!deliveryman){
            throw new Error('Username or password invalid')
        }

        const passswordMatch = await compare(password, deliveryman.password)

        if(!passswordMatch){
            throw new Error('Username or password invalid')
        }

        const token = sign({username}, 'ff6189891a472d299079010ad5461b57',{
            subject: deliveryman.id,
            expiresIn:'1d'
        })

        return token

    }
}