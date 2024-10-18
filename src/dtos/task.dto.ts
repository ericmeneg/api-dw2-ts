import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

// O símbolo @ indica um decorator, em javascript eles injetam código no arquivo
export class CreateTaskDTO{
    @IsString()
    @IsNotEmpty()
    title!: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean

    @IsInt()
    @IsNotEmpty()
    userId!: number
}

export class UpdateTaskDTO{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string

    @IsOptional()
    @IsBoolean()
    completed?: boolean
}