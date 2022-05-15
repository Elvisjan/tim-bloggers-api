import express, { Request, Response } from "express"
import cors from 'cors'
import { bloggersRoute } from "./routes/bloggers-router"
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

app.use('/bloggers',bloggersRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})