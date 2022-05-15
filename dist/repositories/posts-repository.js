"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const bloggers_repository_1 = require("./bloggers-repository");
const posts = [
    {
        "id": 0,
        "title": "string",
        "shortDescription": "string",
        "content": "string",
        "bloggerId": 0,
        "bloggerName": "string"
    }
];
exports.postsRepository = {
    getPosts() { return posts; },
    createPost(title, shortDescription, content, bloggerId) {
        const blogger = bloggers_repository_1.bloggerRepository.findBlogger(bloggerId);
        if (!blogger)
            return false;
        const newPost = {
            id: +(new Date()),
            title,
            content,
            shortDescription,
            bloggerId: blogger.id,
            bloggerName: ''
        };
        posts.push(newPost);
        return newPost;
    },
    deletePost() {
    }
};
//# sourceMappingURL=posts-repository.js.map