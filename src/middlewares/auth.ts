import { NextFunction, Request, Response } from "express"
import base64 from "base-64"
// express basic auth middleware
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      const [type, credentials] = req.headers.authorization.split(" ")
      if (type === "Basic" && (base64.decode(credentials) === "admin:qwerty")) {
        next()
      }
      else {
        res.status(401).send("Unauthorized")
      }
    }
    else {
      res.status(401).send("Unauthorized")
    }
  }
  catch (err) {
    res.status(500).send(err)
  }
}