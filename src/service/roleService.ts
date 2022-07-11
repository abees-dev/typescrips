import { NotFoundError } from './../shared/errors'
import { ParamMissingError } from '../shared/errors'
import RoleModel, { IRole } from '../models/Role'
import { isValidObjectId } from 'mongoose'

export const createRole = async ({ name }: IRole) => {
  if (!name) {
    throw new ParamMissingError('Missing the parameter')
  }
  const newRole = new RoleModel({
    name,
  })
  await newRole.save()
  return newRole
}

export const updateRole = async (id: string, name: string) => {
  if (!id) {
    throw new ParamMissingError('Missing the parameter (/_id)')
  }

  if (!name) {
    throw new ParamMissingError('Missing the parameter (/ name )')
  }

  if (!isValidObjectId(id)) {
    throw new NotFoundError('This role does not exist on the system')
  }
  const existRole = await RoleModel.findById(id)
  if (!existRole) {
    throw new NotFoundError('This role does not exist on the system')
  }

  const newRole = await RoleModel.findByIdAndUpdate(id, { name }, { new: true })
  return newRole
}

export const deteleRole = async (id: string) => {
  if (!id) {
    throw new ParamMissingError('Missing the parameter (/_id)')
  }

  if (!isValidObjectId(id)) {
    throw new NotFoundError('This role does not exist on the system')
  }
  const existRole = await RoleModel.findById(id)
  if (!existRole) {
    throw new NotFoundError('This role does not exist on the system')
  }

  const deletedRole = await RoleModel.findByIdAndDelete(id)
  return deletedRole
}
