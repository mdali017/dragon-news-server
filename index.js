const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;

app.use(cors())

const categories = require('./data/Categories')
const news = require('./data/news.json');

app.get('/', (req, res) => {
    res.send('Dragon Server is Running')
})

app.get('/categories', (req, res) => {
    // console.log(categories, 12)
    res.send(categories)
})

// ---------------------------- News Related Apis -----------------

// 1. All News
app.get('/news', (req, res) => {
    res.send(news);
})

// 2. Specific News by id
app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const selectedNews = news.find(n => n._id === id);
    res.send(selectedNews);
})

// Category wise News 
app.get('/categories/:id', (req, res) => {
    // const id = req.params.id;
    const id = parseInt(req.params.id);
    // console.log(id);
    // if (id === 0) {
    if (id === 0) {
        res.send(news)
    } else {
        const categoryNews = news.filter(n => parseInt(n.category_id) === id);
        res.send(categoryNews);
    }
    // const categoryNews = news.filter(n => n.category_id === id);
    // res.send(categoryNews);
})

app.listen(port, () => {
    console.log(`Dragon Server is Running on Port : ${port}`)
})