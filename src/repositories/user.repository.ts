import User from '../entities/user.entity'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto'

export const createUser = async (data: CreateUserDTO) => {
    return await User.create({data})
}

export const findUserByEmail = async (email: string) => {
    return User.findFirst({where: {email}})
}

export const findAllUsers = async () => {
    return User.findMany()
}

export const deleteUser = async (id: number) => {
    return User.delete({where: {id}}) //where: {id} é uma abreviação de where: {id: id}, porque a variável local id e a chave id tem o mesmo nome, caso tivessem nomes diferentes (ex: num), precisariamos escrever where: {id: num}
}

export const findUserById = async (id: number) => {
    return User.findFirst({where: {id}})
}

export const updateUser = async (id: number, data: UpdateUserDTO) => {
    return User.update({where: {id}, data}) // data é uma abreviação de data:data, mesmo caso da função deleteUser
}

export const findUserByIdWithTasks = async (id: number) => {
    return User.findFirst({where: {id}, include: {task: true}})
}