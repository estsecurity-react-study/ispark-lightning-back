import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const referer = req.headers.referer || null;
  const userAgent = req.headers['user-agent'];
  console.log(referer, userAgent);
  next();
};
export default logger;
