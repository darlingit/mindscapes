import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';

const app = express();

//TODO: change limit of uploading files to mongoDB
app.use(bodyParser.json({limit: '16mb', extended: true}));

async function withDB(operations, res) {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('mindscapes');
        await operations(db);

        client.close();
    } catch (error) {
        console.log(error);
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

app.delete('/api/sessions/delete', async (req, res) => {
    const {sessionId} = req.body;

    await withDB(async (db) => {
        db.collection('sessions').deleteOne({_id: ObjectID(sessionId)})
        res.status(200).json("deleted");
    }, res);
})


async function csvToJson(csvString) {
    const csv = require('csvtojson');
    return new Promise((resolve) => {
        csv().fromString(csvString)
            .then((jsonObj) => {
                resolve(jsonObj);
            });
    });
}

app.post('/api/sessions/update', async (req, res) => {
    const { sessionName, design } = req.body;

    await withDB(async (db) => {
        await db.collection("sessions").updateOne({ name: sessionName }, {
            $set: {design: design}
        })
        res.status(200).json("sucess");
    }, res);
});

app.post('/api/sessions/post', async (req, res) => {
    const { sessionName, filesWithContent } = req.body;

    let jsonFiles = {};

    for (const key of Object.keys(filesWithContent)) {
        try {
            const jsonContent = await csvToJson(filesWithContent[key]);
            jsonFiles = {
                ...jsonFiles,
                [key]: jsonContent,
            }
        } catch (e) {
            console.warn(e.message)
        }
    }


    await withDB(async (db) => {
        const session = {
            name: sessionName,
            uploaded: new Date(),
            eeg: jsonFiles["eegUpload"],
            survey: jsonFiles["surveyUpload"][0],
        }
        await db.collection("sessions").insertOne(session);

        const postedSession = await db.collection('sessions').findOne({ name: sessionName });

        res.status(200).json(postedSession);
    }, res);
});

app.listen(8000, () => console.log("Listening on port 8000"));