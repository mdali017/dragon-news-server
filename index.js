const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;

app.use(cors())

const categories = require('./data/Categories')

app.get('/', (req, res) =>{
    res.send('Dragon Server is Running')
})

app.get('/categories', (req, res) =>{
    // console.log(categories, 12)
    res.send(categories)
})

app.listen(port, () =>{
    console.log(`Dragon Server is Running on Port : ${port}`)
})