import { Request,Response, Router } from "express"
import { bloggerRepository } from "../repositories/bloggers-repository"
import { postsRepository } from "../repositories/posts-repository"
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
export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(posts)
})
postsRouter.post('/', (req: Request, res: Response) => {
  // if(!req.body.name|| req.body.name.length > 40) {
  //   res.status(400).send({ errorsMessages: [{ message: "string", field: "name" }], resultCode: 1 })
  // }
  const {title,content,shortDescription,bloggerId} = req.body
// {"content":"new post content","shortDescription":"description","title":"post title","bloggerId":"1654612489510"}
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
postsRouter.delete('/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  if(!id || !posts.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  posts=posts.filter(v=>v.id!==id)
  res.sendStatus(204)
 })
 postsRouter.put('/:id',(req: Request, res: Response)=>{
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
postsRouter.delete('/',(req: Request, res: Response)=>{
  posts = []
  res.sendStatus(204)
 })