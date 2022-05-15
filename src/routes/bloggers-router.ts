import express, { Request, Response, Router } from "express"

export const bloggersRoute =Router({})

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
bloggersRoute.get('/', (req: Request, res: Response) => {
  res.send(bloggers)
})
bloggersRoute.post('/', (req: Request, res: Response) => {
  if(!req.body.title|| req.body.title.length > 40) {
    res.status(400).send({ errorsMessages: [{ message: "string", field: "title" }], resultCode: 1 })
  }
  const newVideo = {
      id: +(new Date()),
      name: req.body.title,
      youtubeUrl: 'it-incubator.eu'
  }
  bloggers.push(newVideo)
  res.status(201).send(newVideo)
})
bloggersRoute.get('/:bloggerId', (req: Request, res: Response) => {
  const id = +req.params.bloggerI;
  const currentVideo = bloggers.find(v=>v.id===id)
  if(!currentVideo) {
    res.sendStatus(404)
  }
  res.send(currentVideo)
})
bloggersRoute.delete('/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  if(!bloggers.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  bloggers=bloggers.filter(v=>v.id!==id)
  res.sendStatus(204)
 })
 bloggersRoute.put('/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  const title = req.body.title
  if(!id ||!title|| title.length > 40) {
    res.status(400).send({ errorsMessages: [{ message: "field incorrect", field: "title" }], resultCode: 1 })
  }
  if(!bloggers.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  bloggers= bloggers.map((v)=>{
   if(v.id!==id) return v
   return {...v,title}
 })
  res.status(204).send(bloggers) 
})