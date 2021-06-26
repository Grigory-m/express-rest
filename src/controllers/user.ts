import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import logger from '../common/logger';
import { User } from '../entities/User';
import { JWT_SECRET_KEY } from '../common/config';

const router = express.Router();
const { INTERNAL_SERVER_ERROR, FORBIDDEN, OK } = StatusCodes;

router.route('/').post(async (req: Request, res: Response) => {
  const { login, password } = req.body;    
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ login });    
    if (user) {      
      const match = await bcrypt.compare(password, user.password);
      if (match) {        
        try {
          const token = jwt.sign({ id: user.id, login }, JWT_SECRET_KEY!, { expiresIn: 60 * 60 * 24 });
          res.status(OK).json({ token });
        } catch (error) {
          logger.error(`${error.message}`);
          res.status(INTERNAL_SERVER_ERROR).send(getReasonPhrase(INTERNAL_SERVER_ERROR));
        }      
      } else {
        res.status(FORBIDDEN).send(getReasonPhrase(FORBIDDEN));
      }
    }
  } catch (error) {
    logger.error(`${error.message}`);
    res.status(FORBIDDEN).send(getReasonPhrase(FORBIDDEN));
  }  
});

export default router;