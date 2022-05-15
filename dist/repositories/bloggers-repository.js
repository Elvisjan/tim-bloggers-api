"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggerRepository = void 0;
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
];
exports.bloggerRepository = {
    findBlogger(id) {
        var _a;
        return (_a = bloggers.find(b => b.id === id)) !== null && _a !== void 0 ? _a : null;
    }
};
//# sourceMappingURL=bloggers-repository.js.map