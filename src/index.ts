import express, { Request, Response } from "express"
import cors from 'cors'
let videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]  
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    console.log('first')
  res.send('Hellasdaso Glya!')
})
app.get('/videos/', (req: Request, res: Response) => {
  res.send(videos)
})
app.post('/videos', (req: Request, res: Response) => {
  if(!req.body.title|| req.body.title.length > 40) {
    res.status(400).send({ errorsMessages: [{ message: "string", field: "title" }], resultCode: 1 })
  }
  const newVideo = {
      id: +(new Date()),
      title: req.body.title,
      author: 'it-incubator.eu'
  }
  videos.push(newVideo)
  res.status(201).send(newVideo)
})
app.get('/videos/:videoId', (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const currentVideo = videos.find(v=>v.id===id)
  if(!currentVideo) {
    res.sendStatus(404)
  }
  res.send(currentVideo)
})
app.delete('/videos/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  if(!videos.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  videos=videos.filter(v=>v.id!==id)
  res.sendStatus(204)
 })
 app.put('/videos/:id',(req: Request, res: Response)=>{
  const id = +req.params.id;
  const title = req.body.title
  if(!id ||!title|| title.length > 40) {
    res.status(400).send({ errorsMessages: [{ message: "field incorrect", field: "title" }], resultCode: 1 })
  }
  if(!videos.map(v=>v.id).includes(id)) {
    res.sendStatus(404)
  }
  videos= videos.map((v)=>{
   if(v.id!==id) return v
   return {...v,title}
 })
  res.status(204).send(videos) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})