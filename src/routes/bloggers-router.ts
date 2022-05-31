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
  const newBlogger = {
      id: +(new Date()),
      name: req.body.name,
      youtubeUrl: 'it-incubator.eu'
  }
  bloggers.push(newBlogger)
  res.status(201).send(newBlogger)
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
 bloggersRouter.put('/:id',(req: Request, res: Response) => {
  const id = +req.params.id
  const newName = req.body.name
  const newYoutubeUrl = req.body.youtubeUrl
  const blogger = bloggers.find(v=>v.id === id)
  if(blogger && newName.length <= 40 ){
    blogger.name = newName
    blogger.youtubeUrl = newYoutubeUrl
      res.status(204).send(blogger)
      return
  }
  if(blogger && newName.length > 40 ){
      res.status(400).send({
          "errorsMessages": [
              {
                  "message": "string",
                  "field": "string"
              }
          ],
          "resultCode": 0
      })
      return
  }
  if(!blogger){
      res.status(204).send('No Content')
      return;
  }
  res.status(404).send({
      "errorsMessages": [
          {
              "message": "string",
              "field": "string"
          }
      ],
      "resultCode": 0
  })
  return;
})