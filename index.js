const express  = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const routes = require('./routes');
routes(app);

app.listen(3001, ()=>{
    console.log('server starting');
});