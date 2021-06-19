import { getConnection, createConnection, Connection } from 'typeorm';
import logger from '../common/logger';

export const connect = async () => {
  let connection: Connection | undefined;

  try {
    connection = getConnection();    
  } catch (error) {
    logger.error(`${error.message}`);
  }

  try {
    if (connection) {
      if (!connection.isConnected) await connection.connect();
    } else {
      await createConnection();
    }
  } catch (error) {
    logger.error(`${error.message}`);
  } 
}

export const connectToDB = async (cb: () => void) => {
  try {
    await connect();
    cb();
    console.log('Connected to DB!');
  } catch (error) {
    console.log('Error in connection!')
    logger.error(`${error.message}`);
  }
}