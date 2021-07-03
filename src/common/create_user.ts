import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

export default async (): Promise<void> => {
  let user = new User();
  const userRepository = getRepository(User);
  const password = bcrypt.hashSync('admin', 10);
  user = { id: user.id, name: 'admin', login: 'admin', password };
  await userRepository.save(user);
};
