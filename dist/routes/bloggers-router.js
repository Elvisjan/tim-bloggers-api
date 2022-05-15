"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRouter = void 0;
const express_1 = require("express");
exports.bloggersRouter = (0, express_1.Router)({});
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
exports.bloggersRouter.get('/', (req, res) => {
    res.status(200).send(bloggers);
});
exports.bloggersRouter.post('/', (req, res) => {
    if (!req.body.name || req.body.name.length > 40) {
        res.status(400).send({ errorsMessages: [{ message: "string", field: "name" }], resultCode: 1 });
    }
    const newVideo = {
        id: +(new Date()),
        name: req.body.name,
        youtubeUrl: 'it-incubator.eu'
    };
    bloggers.push(newVideo);
    res.status(201).send(newVideo);
});
exports.bloggersRouter.get('/:bloggerId', (req, res) => {
    const id = +req.params.bloggerId;
    const currentVideo = bloggers.find(v => v.id === id);
    if (!currentVideo) {
        res.sendStatus(404);
    }
    res.send(currentVideo);
});
exports.bloggersRouter.delete('/:id', (req, res) => {
    const id = +req.params.id;
    if (!bloggers.map(v => v.id).includes(id)) {
        res.sendStatus(404);
    }
    bloggers = bloggers.filter(v => v.id !== id);
    res.sendStatus(204);
});
exports.bloggersRouter.put('/:id', (req, res) => {
    const id = +req.params.id;
    const name = req.body.name;
    if (!id || !name || name.length > 40) {
        res.status(400).send({ errorsMessages: [{ message: "field incorrect", field: "name" }], resultCode: 1 });
    }
    if (!bloggers.map(v => v.id).includes(id)) {
        res.sendStatus(404);
    }
    bloggers = bloggers.map((v) => {
        if (v.id !== id)
            return v;
        return Object.assign(Object.assign({}, v), { name });
    });
    res.status(204).send(bloggers);
});
//# sourceMappingURL=bloggers-router.js.map