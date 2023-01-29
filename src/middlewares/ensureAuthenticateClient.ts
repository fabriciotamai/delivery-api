import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload{
    sub:string;
}

export async function ensureAuthenticateClient(request: Request, response: Response, next:NewableFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).json({
            message:'Token missing',
        })
    }

    const [,token] = authHeader.split(" ")

    try{
       const { sub } = verify(token,"ff6189891a471d299079010ad5461b57") as Ipayload; 
    

        request.id_client = sub;

       return next();

    }catch(err){
        return response.status(401).json({
            message:'invalid toking'
        });

    }



    

}