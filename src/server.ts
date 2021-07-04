import bcrypt from 'bcryptjs';
import { PORT } from './common/config';
import app from './app';
import { connectToDB } from './database/db';
import usersService from './resources/users/user.service';
import { User } from './entities/User';

connectToDB(() => {
  app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
})
.then(async () => {
  let user = new User();
  const password = bcrypt.hashSync('admin', 10);
  user = { id: user.id, name: 'admin', login: 'admin', password };
  await usersService.create(user);
});