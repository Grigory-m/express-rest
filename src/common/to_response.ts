import { User } from '../users/user.entity';

export const toResponse = (
  user: User
): { id: string; name: string; login: string } => {
  const { id, name, login } = user;
  return { id, name, login };
};
