import { plainToInstance } from "class-transformer"
import { NextFunction, Request, Response } from "express"
import { validate as classValidatorValidate } from "class-validator" // como criamos localmente uma função chamada validate, e o nome da função que estamos tentando importar também é validate, adicionamos um alias para evitar conflitos

export const validate = (dto: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const data = plainToInstance(dto, req.body) // recebe o body da requisição e tenta criar uma classe a partir desse json dentro dos padrões da DTO, devolvendo um erro caso este não se encaixe
        const errors = await classValidatorValidate(data)

        if (errors.length > 0){
            return res.status(400).json({errors})
        }

        req.body = data
        next()
    }
}