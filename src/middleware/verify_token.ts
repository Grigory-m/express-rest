import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { JWT_SECRET_KEY } from '../common/config';

const { UNAUTHORIZED } = StatusCodes;

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    if (bearerToken) {
      try {
        const decoded = jwt.verify(bearerToken, JWT_SECRET_KEY!);
        if (decoded) {
          req.token = bearerToken;
          next();          
        }
      } catch (error) {
        res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
      }
    }    
  } else {
    res.status(UNAUTHORIZED).send(getReasonPhrase(UNAUTHORIZED));
  }
}