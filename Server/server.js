const express = require('express');
const expressHbs = require('express-handlebars');
const bodyparser = require('body-parser');
// const url = 'mongodb+srv://namnguyen:Nam280103@cluster0.zyd4ou2.mongodb.net/DB?retryWrites=true&w=majority';
// const mongoose = require('mongoose');
const userController = require('./Controllers/Controller');
const app = express();

// Cấu hình để chạy file .hbs
app.engine('.hbs', expressHbs.engine({
  defaultLayout: null,
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));

app.set('view engine', '.hbs');

// Cấu hình để chạy bodyparser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Kết nối cơ sở dữ liệu
const admin = require('firebase-admin');
const credentials = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();


app.use('/', userController);
const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log('Server is running');
});
