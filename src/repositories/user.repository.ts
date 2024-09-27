import User from '../entities/user.entity'

//DTO = data transfer object
//Interface é uma forma de tipar objetos literais em typescript
interface CreateUserDTO {
    name: string,
    email: string,
    password: string,
}

export const createUser = async (data: CreateUserDTO) => {
    return await User.create({data})
}

export const findUserByEmail = async (email: string) => {
    return User.findFirst({where: {email}})
}