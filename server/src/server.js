import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

app.use(bodyParser.json());

async function withDB(operations, res) {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('mindscapes');

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({message: "Error with db connection", error});
    }
}

app.get('/api/sessions', async (req, res) => {
    await withDB(async (db) => {
        const allSessions = await db.collection('sessions').find({}).toArray();
        res.status(200).json(allSessions);
    }, res);
})

app.get('/api/sessions/:name', async (req, res) => {
    await withDB(async (db) => {
        const sessionName = req.params.name;

        const sessionInfo = await db.collection('sessions').findOne({ name: sessionName});
        res.status(200).json(sessionInfo);
    }, res);
})

// app.post('/api/articles/:name/add-comment', (req, res) => {
//     const { username, text } = req.body;
//     const articleName = req.params.name;
//
//     withDB(async (db) => {
//         const articleInfo = await db.collection('articles').findOne({ name: articleName });
//         await db.collection('articles').updateOne({ name: articleName }, {
//             '$set': {
//                 comments: articleInfo.comments.concat({ username, text }),
//             },
//         });
//         const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
//
//         res.status(200).json(updatedArticleInfo);
//     }, res);
// });

app.listen(8000, () => console.log("Listening on port 8000"));