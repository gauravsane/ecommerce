require('dotenv').config();
const express = require('express')
require('./database/db');
const app = express();
const cors = require('cors')
const router = require('./routes/router');
const cookieParser = require('cookie-parser');
const port = 3200;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.get('/', (req, res) => {
    res.send('welcome')
})

app.listen(port, ()=>{
    console.log(`server listening on http://localhost:${port}`);
})