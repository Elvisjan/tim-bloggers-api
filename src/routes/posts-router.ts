import { Request,Response, Router } from "express"
import { authMiddleware } from "../middlewares"
import { bloggerRepository } from "../repositories/bloggers-repository"
import { postsRepository } from "../repositories/posts-repository"
import { bloggers } from "./bloggers-router"
let posts = [
  {
    "id": 0,
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "bloggerId": 0,
    "bloggerName": "string"
  }
]
type Error = {
  message: string
  field: string
}
const errorHandler = ( errors: Error[],message: string, field: string) => {
  const error: Error = {
      message,
      field
  }
  errors.push(error)
}
const sendError = (res: Response, errorsMessages: Error[], status: number, withResultCode  = false) => {
  const defaultPayload = {
    errorsMessages,
  }
  const payloadWithCode = {...defaultPayload,
  resultCode:1}
  res.status(status).send(withResultCode ? payloadWithCode: defaultPayload)
}
export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(posts)
})
postsRouter.post('/',authMiddleware, (req: Request, res: Response) => {
  const errors: Error[] = []
  const {title,content,shortDescription,bloggerId} = req.body
  if(!title || !title.trim()|| title.length >30) errorHandler(errors, 'title is not valid','title')
  if(!content||!content.trim() || content.length> 1000) errorHandler(errors, 'content is not valid','content')
  if(!shortDescription|| !shortDescription.trim()|| shortDescription.length> 100) errorHandler(errors, 'shortDescription is not valid','shortDescription')
  if(!bloggerId) errorHandler(errors, 'shortDescription is not valid','shortDescription')
  const blogger = bloggers?.find(bl => bl.id === bloggerId)
  if (!blogger) {
    errorHandler(errors, "Error Type: Your should have blogger Id", "bloggerId")
  }
  if(errors.length > 0) sendError(res, errors, 400)
  const newPost = {
    id: +(new Date()),
    ...req.body,
    bloggerName: 'Hallo'
  }
  posts.push(newPost)
  res.status(201).send(newPost)
})
postsRouter.get('/:bloggerId', (req: Request, res: Response) => {
  const id = +req.params.bloggerId;
  const currentVideo = posts.find(v=>v.id===id)
  if(!id || !currentVideo) {
    res.sendStatus(404)
  }
  res.send(currentVideo)
})
postsRouter.delete('/:id',authMiddleware,(req: Request, res: Response)=>{
  const id = +req.params.id;
  if(!id || !posts.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  posts=posts.filter(v=>v.id!==id)
  res.sendStatus(204)
 })
 postsRouter.put('/:id',authMiddleware,(req: Request, res: Response)=>{
  const errors: Error[] = []
  const {title,content,shortDescription,bloggerId} = req.body
  if(!title || !title.trim()|| title.length >30) errorHandler(errors, 'title is not valid','title')
  if(!content||!content.trim() || content.length> 1000) errorHandler(errors, 'content is not valid','content')
  if(!shortDescription|| !shortDescription.trim()|| shortDescription.length> 100) errorHandler(errors, 'shortDescription is not valid','shortDescription')
  if(!bloggerId) errorHandler(errors, 'shortDescription is not valid','shortDescription')
  const blogger = bloggers?.find(bl => bl.id === bloggerId)
  if (!blogger) {
    errorHandler(errors, "Error Type: Your should have blogger Id", "bloggerId")
  }
  if(errors.length > 0) sendError(res, errors, 400)
  const id = +req.params.id;
  if(!id) {
    res.status(400).send({ errorsMessages: [{ message: "field incorrect", field: "name" }], resultCode: 1 })
  }
  if(!posts.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  posts= posts.map((v)=>{
   if(v.id!==id) return v
   return {...v,...req.body}
 })
  res.status(204).send(posts) 
})
postsRouter.delete('/',authMiddleware,(req: Request, res: Response)=>{
  posts = []
  res.sendStatus(204)
 })