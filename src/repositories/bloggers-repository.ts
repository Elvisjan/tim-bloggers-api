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
export const bloggerRepository = {
    findBlogger(id: number) {
      return bloggers.find(b=>b.id===id) ?? null
    }
}