import { NextFunction, Request, Response } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const basicAuth = req.headers.authorization ?? ''
  const [,credentials] = basicAuth?.split(' ')
  const [login,password] = credentials?.split(':')
  if(!(login||password) || login !== 'admin' || password!=='qwerty') {
    res.status(401)
  }
  next()
}