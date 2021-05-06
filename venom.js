const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
require('./src/Routes/index')(app); // <--- basta adicionar essa linha

app.use(cors());
app.use(express.json());
app.listen(3333);
