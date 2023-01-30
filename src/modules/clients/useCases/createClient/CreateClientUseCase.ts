import { prisma} from '../../../../database/prismaClient';
import { hash} from "bcrypt";



interface IcreateClient{
    username:string;
    password:string;
}

export class CreateClienteUseCase {
    async execute({password, username}:IcreateClient){

        const clientExists = await prisma.clients.findFirst({
            where: {
                    username :{
                        equals:username,
                        mode:"insensitive"

            }
         }
        })

        if(clientExists){
            throw new Error('Cliente already exists')
        }

        const hashPassword = await hash(password, 10);

        const client =  await prisma.clients.create({
            data:{
                username,
                password:hashPassword
            }
        })

        return client;

   

    }
}