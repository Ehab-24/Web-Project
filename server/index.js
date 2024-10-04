const express = require('express');
const cors = require('cors')
const path = require('path')
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

app.get('/properties', (_, res) => {
    res.sendFile(__dirname + '/data/properties.json');
});

app.get('/categories', (_, res) => {
    res.sendFile(__dirname + '/data/categories.json');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

