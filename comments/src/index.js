import express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    res.send(comments[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
    const id = req.params.id;
    const comment = req.body.comment;
    const comment_id = randomBytes(4).toString("hex");
    comments[id]
        ? comments[id].push({ id: comment_id, comment })
        : (comments[id] = [{ id: comment_id, comment }]);

    res.status(201).send(comments[id]);
});

app.listen(4001, () => {
    console.log("Listening to 4001");
});
