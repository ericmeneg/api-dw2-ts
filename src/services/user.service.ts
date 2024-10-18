import {createUser, deleteUser, findAllUsers, findUserByEmail, findUserById, findUserByIdWithTasks, updateUser} from '../repositories/user.repository'
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto'
import * as bcrypt from 'bcrypt'
import * as jose from 'jose'

export const createUserService = async (data: CreateUserDTO) => {
    const user = await findUserByEmail(data.email)
    if (user) throw new Error('E-mail já cadastrado!')

    const password = await bcrypt.hash(data.password, 10) //essa função da lib bcrypt gera a hash da string recebido

    return await createUser({...data, password}) //...data tem o mesmo significado que data.name, data.email, data.password, quando passamos password como parametro o que o program lê é data.password = password
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

export const findUserByIdWithTasksService = async (id: number) => {
    return await findUserByIdWithTasks(id)
}

export const authUserService = async (email: string, password: string) => {
    const user = await findUserByEmail(email)
    if(!user) throw new Error("Usuário não encontrado")

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) throw new Error("Senha inválida")

    const payload = {id: user.id, email: user.email}
    const secret = new TextEncoder().encode("testedechavesecretagrande0001") //o seguro é que essa chave não fique no código, mas no .env
    const alg = "HS256"

    const token = await new jose.SignJWT(payload) //as linhas 51-56 poderiam ser escritas diretamente em frente a jose.SignJWT(payload), elas ficam separadas apenas para facilitar a leitura
    .setProtectedHeader({alg})
    .setIssuedAt()
    .setIssuer('http://localhost:3000')
    .setSubject('user')
    .setExpirationTime('1h')
    .sign(secret)

    return token
}