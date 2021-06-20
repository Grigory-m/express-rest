import { User } from '../entities/User'

export const toResponse = (user: User) => {
  const { id, name, login } = user;
  return { id, name, login };
}