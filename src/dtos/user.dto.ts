import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator'

//DTO = data transfer object
//Interface é uma forma de tipar objetos literais em typescript
export class CreateUserDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    name!: string

    @IsEmail()
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string
}

