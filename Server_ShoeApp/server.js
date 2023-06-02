const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const bodyparser = require('body-parser');

const admin = require('firebase-admin');
const credentials = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const userController = require('./Controllers/Controller');

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

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Cấu hình để chạy bodyparser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

<<<<<<< HEAD
const PORT = process.env.PORT || 9999;
app.use('/', userController);
=======
const PORT = process.env.PORT || 3000;
>>>>>>> 00532a7609adef09e0c403abddf69a872bae946f

app.listen(PORT, () => {
    console.log('Server is running');
});
