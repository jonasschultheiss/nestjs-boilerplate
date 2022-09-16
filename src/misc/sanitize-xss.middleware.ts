import { NextFunction, Request, Response } from 'express';
import { filterXSS } from 'xss';

export function sanitizeXSS(req: Request, res: Response, next: NextFunction): void {
  if (req.body) {
    const textBody = JSON.stringify(req.body);
    const sanitizedBody = filterXSS(textBody);
    req.body = JSON.parse(sanitizedBody);
  }

  next();
}
