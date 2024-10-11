import { createUser, findAllUsers } from "../controllers/user.controller"
import { Router } from "express"

const router = Router()

router.post('/', createUser)
router.get('/', findAllUsers)

export default router