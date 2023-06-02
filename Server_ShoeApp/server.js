const { async } = require('@firebase/util');
const express = require('express');
const app = express();

const admin = require('firebase-admin');
const credentials = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json);

app.use(express.urlencoded({ extended: true }));

const db = admin.firestore();

app.post('/create', async (req, res) => {
    try {
        const styleid = req.params.styleid;
        const ProductJson = {
            search_image: req.body.search_image,
            brands_filter_facet: req.body.brands_filter_facet,
            price: req.body.price,
            product_additional_info: req.body.product_additional_info
        };
        const response = db.collection('products').add(ProductJson)
        res.send(response);
    } catch (err) {
        res.send(err);
    }
})

app.get('/read/all', async (req, res) => {
    try {
        const ProductRef = db.collection('products');
        const response = await ProductRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
})

app.post('/update', async (req, res) => {
    try {
        const styleid = req.body.styleid;
        const newName = 'nameeeee';
        const ProductRef = await db.collection('products').doc(styleid)
        .update({
            brands_filter_facet: newName
        });
        res.send(ProductRef);
    } catch (error) {
        res.send(error);
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const response = await db.collection('products').doc(req.params.styleid).delete();
        res.send(response);
    } catch (error) {
        res.send(error);
    }
})

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log('Server is running');
});