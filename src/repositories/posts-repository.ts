import { bloggerRepository } from "./bloggers-repository"

const posts = [
  {
    "id": 0,
    "title": "string",
    "shortDescription": "string",
    "content": "string",
    "bloggerId": 0,
    "bloggerName": "string"
  }
]
interface IPost {
  id: number,
  title: string,
  shortDescription:string,
  content: string,
  bloggerId: number,
  bloggerName: string
}
export const postsRepository = {
  getPosts() { return posts },
  createPost(title : string,shortDescription:string,content: string,bloggerId:number) : IPost | boolean{
    const blogger = bloggerRepository.findBlogger(bloggerId)
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
  return newPost
  },
  deletePost(){
    
  }
}