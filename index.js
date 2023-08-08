const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;

app.use(cors())

const categories = require('./data/Categories')
const news = require('./data/news.json');

// user: 
// pass: 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5julrfk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const categoryCollection = client.db("the-dragon-news").collection("categories")
    const newsCollection = client.db("the-dragon-news").collection("news")

    // ---------- categories related api
    app.get('/categories', async(req, res) => {
        const result = await categoryCollection.find().toArray();
        res.send(result)
    })

    // --------- news related apis

    // All News
    app.get('/news', async(req, res) => {
        const result = await newsCollection.find().toArray();
        res.send(result);
    })

    // Specific News by Id
    app.get('/news/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id:new ObjectId(id)}
        const result = await newsCollection.findOne(query);
        res.send(result)
    })

    // category wise news
    app.get('/categories/:id', async(req, res) => {
        
        const id = parseInt((req.params.id))
        const newsCategory = {category_number: id}
        if (id === 0) {
          const result = await newsCollection.find().toArray();
            res.send(result)
        } else {
           
        }
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Dragon Server is Running')
})




// ---------------------------- News Related Apis -----------------


// Category wise News 
// app.get('/categories/:id', (req, res) => {
//     // const id = req.params.id;
//     const id = parseInt(req.params.id);
//     // console.log(id);
//     // if (id === 0) {
//     if (id === 0) {
//         res.send(news)
//     } else {
//         const categoryNews = news.filter(n => parseInt(n.category_id) === id);
//         res.send(categoryNews);
//     }
//     // const categoryNews = news.filter(n => n.category_id === id);
//     // res.send(categoryNews);
// })

app.listen(port, () => {
    console.log(`Dragon Server is Running on Port : ${port}`)
})