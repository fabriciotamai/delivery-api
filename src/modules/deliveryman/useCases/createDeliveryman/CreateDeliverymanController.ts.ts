import { Request, Response } from "express";
import { CreateDeliverymanUseCase } from "./CreateDeliverymanUseCases";

export class CreateDeliverymanController {
    async handle(request:Request, response:Response){
        const { username, password } = request.body;

        const createDeliverymanteUseCase = new CreateDeliverymanUseCase();

        const result = await createDeliverymanteUseCase.execute({
            username,
            password
        })


    return response.json(result);

    }

}