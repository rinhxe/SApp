const admin = require('firebase-admin');
const db = admin.firestore();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/home', async(req, res) => {
    try {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
        });

        res.render('home', { arrProduct: products });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.get('/add', async(req, res) => {
    res.render('add.hbs');
});

app.post('/create', async(req, res) => {
    try {
        const { search_image, brands_filter_facet, price, product_additional_info } = req.body;
        if (!search_image || !brands_filter_facet || !price || !product_additional_info) {
            return res.status(400).send('Lỗi dữ liệu');
        }

        const productData = {
            search_image,
            brands_filter_facet,
            price,
            product_additional_info,
        };

        await db.collection('products').add(productData);
        res.redirect('/home');
    } catch (err) {
        console.error('Lỗi khi thêm dữ liệu:', err);
        res.status(500).send('Server Error');
    }
});


app.get('/read/all', async(req, res) => {
    try {
        const productsSnapshot = await db.collection('products').get();
        const products = productsSnapshot.docs.map((doc) => {
            const data = doc.data();
            data.styleid = doc.id;
            return data;
        });
        const response = {
            products: products
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});


app.post('/update/:id', async(req, res) => {
    try {
        const productId = req.params.id;
        const productRef = db.collection('products').doc(productId);
        const { search_image, brands_filter_facet, price, product_additional_info } = req.body;

        if (!search_image || !brands_filter_facet || !price || !product_additional_info) {
            throw new Error('Lỗi Nhập dữ liệu');
        }

        await productRef.update({
            search_image,
            brands_filter_facet,
            price,
            product_additional_info,
        });

        res.redirect('/home');
    } catch (error) {
        res.send(error.message);
    }
});





app.post('/delete/:id', async(req, res) => {
    try {
        const productId = req.params.id;
        await db.collection('products').doc(productId).delete();

        res.redirect('/home');
    } catch (err) {
        res.send(err);
    }
});

app.get('/search', async(req, res) => {
    try {
        // console.log(req.query.q);
        const query = req.query.q;
        const productsSnapshot = await db.collection('products').get();

        const products = productsSnapshot.docs.map((doc) => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            })
            .filter((product) => product.product_additional_info.includes(query));


        res.render('home', { query: query, arrProduct: products });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = app;