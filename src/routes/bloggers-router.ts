import express, { Request, Response, Router } from "express"

export const bloggersRouter =Router({})

let bloggers = [
  {
    "id": 0,
    "name": "First",
    "youtubeUrl": "zxczxczxcz"
  },
  {
    "id": 1,
    "name": "Second",
    "youtubeUrl": "xzczxccxzc"
  },
  {
    "id": 2,
    "name": "Third",
    "youtubeUrl": "asdasdaxzc"
  },
  {
    "id": 3,
    "name": "Fourth",
    "youtubeUrl": "dfsdzasdas"
  },
  {
    "id": 4,
    "name": "HasNoImagination",
    "youtubeUrl": "gxcvxcfasdxzc"
  },
  {
    "id": 4,
    "name": "HasNoImagination",
    "youtubeUrl": "gxcvxcfasdxzc"
  }
]
bloggersRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(bloggers)
})
bloggersRouter.post('/', (req: Request, res: Response) => {
  if(!req.body.name|| req.body.name.length > 40) {
    res.status(400).send({ errorsMessages: [{ message: "string", field: "name" }], resultCode: 1 })
  }
  const newVideo = {
      id: +(new Date()),
      name: req.body.name,
      youtubeUrl: 'it-incubator.eu'
  }
  bloggers.push(newVideo)
  res.status(201).send(newVideo)
})
bloggersRouter.get('/:bloggerId', (req: Request, res: Response) => {
  const id = +req.params.bloggerId;
  const currentVideo = bloggers.find(v=>v.id===id)
  if(!currentVideo) {
    res.sendStatus(404)
  }
  res.send(currentVideo)
})
bloggersRouter.delete('/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  if(!bloggers.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  bloggers=bloggers.filter(v=>v.id!==id)
  res.sendStatus(204)
 })
 bloggersRouter.put('/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  const name = req.body.name
  const youtubeUrl = req.body.youtubeUrl
  const regex = new RegExp('^https://([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$')
  if(!id ||!name|| !youtubeUrl || name.length > 15 || youtubeUrl.length > 100 || !youtubeUrl?.matches(regex)) {
    res.status(400).send({ errorsMessages: [{ message: "field incorrect", field: "name" }], resultCode: 1 })
  }
  if(!bloggers.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  bloggers= bloggers.map((v)=>{
   if(v.id!==id) return v
   return {...v,name,youtubeUrl}
 })
  res.status(204).send(bloggers) 
})