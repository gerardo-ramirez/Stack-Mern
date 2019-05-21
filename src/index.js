const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
//coneccton db
require('./database');
//import routes api 
const route = require('./routes/route');

//setting 
app.set('port', process.env.PORT || 8080);

//static file
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/tasks', route)

//listen 
app.listen(app.get('port'), () => {
    console.log('listen on port')
});
