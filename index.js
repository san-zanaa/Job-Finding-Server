import express from 'express'; 
import { MongoClient } from 'mongodb';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 5000;


const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

app.use(express.json());
app.use(cors( ))

const connectedClient = await connectToMongoDB();
const database = connectedClient.db("job-hiring");
const users = database.collection("users");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
  const cursor = users.find({});
  const result = await cursor.toArray();
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})