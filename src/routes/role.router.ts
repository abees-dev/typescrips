import { Request, Response, Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import RoleModel, { IRole } from '../models/Role'
import { createRole, deteleRole, updateRole } from '../service/roleService'

const router = Router()

router.get('/all', async (_, res: Response) => {
  try {
    const roles = await RoleModel.find()
    return res.status(200).json({ code: 200, roles })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.post('/create', async (req: Request, res: Response) => {
  try {
    const roles = req.body

    const newRole = await createRole(roles)

    return res.status(StatusCodes.OK).json({ code: StatusCodes.OK, message: 'Create Role', roles: newRole })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.patch('/update/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const { name }: IRole = req.body
    const newRole = await updateRole(id, name)

    return res
      .status(StatusCodes.OK)
      .json({ code: StatusCodes.OK, message: 'Update Role successfully!', role: newRole })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

router.delete('/detele/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id
    const deletedRole = await deteleRole(id)

    return res
      .status(StatusCodes.OK)
      .json({ code: StatusCodes.OK, message: 'Deleted Role successfully!', role: deletedRole })
  } catch (error) {
    return error?.statusCode
      ? res.status(error.statusCode).json({ code: error.statusCode, message: error.message })
      : res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
        })
  }
})

export default router
