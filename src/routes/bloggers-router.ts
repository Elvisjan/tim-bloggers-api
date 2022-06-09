import express, { Request, Response, Router } from "express"

export const bloggersRouter = Router({})

export let bloggers = [
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
bloggersRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(bloggers)
})
bloggersRouter.post('/', (req: Request, res: Response) => {
  const uriRegexp = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")
  const errors: Error[] = []
  const {body} = req
  if (!body.name||!body.name.trim() || body.name.length > 15) {
    errorHandler(errors,'name is not valid','name')
  }
  if(!uriRegexp.test(body.youtubeUrl) || !body.youtubeUrl || !body.youtubeUrl.trim()|| body.youtubeUrl.length > 100 ) errorHandler(errors, 'uri is not valid','youtubeUrl') 
  if(errors.length > 0) sendError(res, errors, 400)
  else {
    const newBlogger = {
      id: +(new Date()),
      name: req.body.name,
      youtubeUrl: 'it-incubator.eu'
    }
    bloggers.push(newBlogger)
    res.status(201).send(newBlogger)
  }
})
bloggersRouter.get('/:bloggerId', (req: Request, res: Response) => {
  const id = +req.params.bloggerId;
  const currentVideo = bloggers.find(v => v.id === id)
  if (!id) {
    res.sendStatus(404)
  }
  if (!currentVideo) {
    res.sendStatus(404)
  }
  res.send(currentVideo)
})
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  if (!id) {
    res.sendStatus(404)
  }
  if (!bloggers.map(v => v.id).includes(id)) {
    res.sendStatus(404)
  }
  bloggers = bloggers.filter(v => v.id !== id)
  res.sendStatus(204)
})
bloggersRouter.put('/:id', (req: Request, res: Response) => {
  const uriRegexp = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")
  const errors: Error[] = []
  const {body} = req
  if (!body.name ||!body.name.trim()|| body.name.length > 15) {
    errorHandler(errors,'name is not valid','name')
  }
  if(!uriRegexp.test(body.youtubeUrl) || !body.youtubeUrl || !body.youtubeUrl.trim()|| body.youtubeUrl.length > 100 ) errorHandler(errors, 'uri is not valid','youtubeUrl') 
  if(errors.length > 0) sendError(res, errors, 400)
  const id = +req.params.id
  const newName = req.body.name
  const newYoutubeUrl = req.body.youtubeUrl
  const blogger = bloggers.find(v => v.id === id)
  if (!id) {
    res.sendStatus(404)
  }
  if (blogger && newName.length <= 40) {
    blogger.name = newName
    blogger.youtubeUrl = newYoutubeUrl
    res.status(204).send(blogger)
    return
  }
  if (blogger && newName.length > 40) {
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
  if (!bloggers.map(v => v.id).includes(id)) {
    res.sendStatus(404)
  }
  if (!blogger) {
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
bloggersRouter.delete('/', (req: Request, res: Response) => {
  bloggers = []
  res.sendStatus(204)
})