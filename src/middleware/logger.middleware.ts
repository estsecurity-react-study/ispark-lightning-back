import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('[App-Log]', req.headers);

  next();
};
export default logger;
