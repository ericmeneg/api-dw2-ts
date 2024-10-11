import { createUser, findAllUsers, deleteUser, updateUser } from "../controllers/user.controller"
import { Router } from "express"
import { validate } from "../middlewares/validate.middleware"
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto"

const router = Router()

router.post('/', validate(CreateUserDTO), createUser)
router.get('/', findAllUsers)
router.delete('/:id', deleteUser) //o :id diz que a requisição vai ser recebida como uma variável chamada id, o nome é importante porque no controller chamamos req.params.id, então aquela função vai procurar por uma variável chamada id passada na requisição
router.patch('/:id', validate(UpdateUserDTO), updateUser) // patch e put: o put substitui a entidade por completo e o patch atualiza apenas determinados campos da entidade existente
export default router