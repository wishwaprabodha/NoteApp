require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./user/route/user-route');
const noteRouter = require('./note/route/note-route');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/note', noteRouter);


app.listen(port, () => {
    console.log("Server up on PORT:" + port);
});

module.exports = app;