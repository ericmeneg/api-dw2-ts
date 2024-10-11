import {createUser, deleteUser, findAllUsers, findUserByEmail, findUserById, updateUser} from '../repositories/user.repository'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto'

export const createUserService = async (data: CreateUserDTO) => {
    const user = await findUserByEmail(data.email)
    if (user) throw new Error('E-mail já cadastrado!')
    return await createUser(data)
}

export const findAllUsersService = async () => {
    return await findAllUsers()
}

export const deleteUserService = async (id: number) => {
    const user = await findUserById(id)
    
    if (!user) throw new Error('Usuário não encontrado')

    return await deleteUser(id)
}

export const updateUserService = async (id:number, data: UpdateUserDTO) => {
    const user = await findUserById(id)

    if (!user) throw new Error('Usuário não encontrado')

    return await updateUser(user.id, data)
}