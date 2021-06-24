import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import logger from '../common/logger';
import { User } from '../entities/User';
import { JWT_SECRET_KEY } from '../common/config';

const router = express.Router();

router.route('/').post(async (req: Request, res: Response) => {
  const { login, password } = req.body;
  const userRepository = getRepository(User);  
  try {
    const user = await userRepository.findOneOrFail({ login });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        try {
          const token = jwt.sign({ id: user.id, login }, JWT_SECRET_KEY!, { expiresIn: 60 * 60 * 24 });
          res.status(200).json({ token });
        } catch (error) {
          logger.error(`${error.message}`);
          res.status(500).json({ error: error.message });
        }      
      } else {
        res.status(403).json({ error: "Incorrect login or password" });
      }
    }
  } catch (error) {
    logger.error(`${error.message}`);
    res.status(403).json({ error: "Incorrect login or password" });
  }  
});

export default router;