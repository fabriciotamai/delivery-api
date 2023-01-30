import { prisma} from '../../../../database/prismaClient';
import { hash} from "bcrypt";

interface ICreateDeliveryman{
    username:string;
    password:string;

}

export class CreateDeliverymanUseCase {

    async execute({username, password}:ICreateDeliveryman){
        const deliveryExists = await prisma.deliveryman.findFirst({
            where: {
                    username :{
                        equals:username,
                        mode:"insensitive"

            }
         }
        })

        if(deliveryExists){
            throw new Error('deliveryman already exists')
        }

        const hashPassword = await hash(password, 10);

        const client =  await prisma.deliveryman.create({
            data:{
                username,
                password:hashPassword
            }
        })

        return client;

   

    


    }
} 