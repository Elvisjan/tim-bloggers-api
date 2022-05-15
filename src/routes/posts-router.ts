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
// postsRouter.get('/', (req: Request, res: Response)=> {
//   const posts = postsRepository.getPosts()
//   res.send(posts)
// })
// postsRouter.post('/',(req: Request, res: Response)=> {
//     if(!req.body.name|| req.body.name.length > 40) {
//       res.status(400).send({ errorsMessages: [{ message: "string", field: "name" }], resultCode: 1 })
//     }
//     const newPost = postsRepository.createPost(req.body.name,req.body.name,req.body.name,req.body.name)
//     res.status(201).send(newPost)
// })
postsRouter.get('/', (req: Request, res: Response) => {
  res.send(posts)
})
postsRouter.post('/', (req: Request, res: Response) => {
  if(!req.body.name|| req.body.name.length > 40) {
    res.status(400).send({ errorsMessages: [{ message: "string", field: "name" }], resultCode: 1 })
  }
  const blogger = bloggerRepository.findBlogger(req.body.bloggerId)
  const {title,content,shortDescription} = req.body
  if(!blogger) return false
  const newPost = {
    id: +(new Date()),
    title,
    content,
    shortDescription,
    bloggerId: blogger.id,
    bloggerName: ''
  }
  posts.push(newPost)
  res.status(201).send(newPost)
})
postsRouter.get('/:bloggerId', (req: Request, res: Response) => {
  const id = +req.params.bloggerId;
  const currentVideo = posts.find(v=>v.id===id)
  if(!currentVideo) {
    res.sendStatus(404)
  }
  res.send(currentVideo)
})
postsRouter.delete('/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  if(!posts.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  posts=posts.filter(v=>v.id!==id)
  res.sendStatus(204)
 })
 postsRouter.put('/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  const name = req.body.name
  if(!id ||!name|| name.length > 40) {
    res.status(400).send({ errorsMessages: [{ message: "field incorrect", field: "name" }], resultCode: 1 })
  }
  if(!posts.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  posts= posts.map((v)=>{
   if(v.id!==id) return v
   return {...v,name}
 })
  res.status(204).send(posts) 
})