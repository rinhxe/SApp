const admin = require('firebase-admin');
const db = admin.firestore();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/home', async (req, res) => {
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


app.get('/add', async (req, res) => {
    res.render('add.hbs');
});


app.post('/create', async (req, res) => {
    try {
        
        const productData = {
            search_image: req.query.search_image,
            brands_filter_facet: req.query.brands_filter_facet,
            price: req.query.price,
            product_additional_info: req.query.product_additional_info
        };

        console.log(req.body);
        const response = await db.collection('products').add(productData);
        res.redirect('/home');
    } catch (err) {
        res.send(err);
    }
});



// app.get('/read/all', async (req, res) => {
//     try {
//         const ProductRef = db.collection('products');
//         const response = await ProductRef.get();
//         let responseArr = [];
//         response.forEach(doc => {
//             responseArr.push(doc.data());
//         });
//         res.send(responseArr);
//     } catch (error) {
//         res.send(error);
//     }
// });

app.get('/read/all', async (req, res) => {
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
  

app.post('/update/:id', async (req, res) => {
    try {
        const ProductRef = db.collection('products').doc(req.params.id);
        await ProductRef.update({
            search_image: req.body.search_image,
            brands_filter_facet: req.body.brands_filter_facet,
            price: req.body.price,
            product_additional_info: req.body.product_additional_info
        });
        // res.send(ProductRef);
        res.redirect('/home');
    } catch (error) {
        res.send(error);
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        // Xóa sản phẩm với ID tương ứng từ Firebase
        await db.collection('products').doc(productId).delete();

        res.redirect('/home'); // Chuyển hướng về trang home sau khi xóa thành công
    } catch (err) {
        res.send(err);
    }
});

app.get('/search', async (req, res) => {
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
