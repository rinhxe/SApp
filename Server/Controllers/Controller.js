// const multer = require('multer');
// const Product = require('../Models/Product');
// const app = express();
// const fs = require('fs');
// const path = require('path');

// //multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'images');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

//// Thêm hàm chuyển đổi ảnh thành base64
// function convertImageToBase64(imagePath) {
//   const image = fs.readFileSync(imagePath);
//   const base64Image = Buffer.from(image).toString('base64');
//   return base64Image;
// }
const admin = require('firebase-admin');
const db = admin.firestore();

app.get('/home', async function (req, res) {
  // try {
  //   const products = await Product.find({});
    res.render('home.hbs') 
  //     arrProduct: products.map((product) => product.toJSON()),
  //   });
  // } catch (err) {
  //   res.status(500).send('Server Error');
  // }
});

app.get('/add', async (req, res) => {
  res.render('add.hbs');
});

// function deleteImage(imagePath) {
//   const absolutePath = path.resolve(imagePath);

//   fs.unlink(absolutePath, (err) => {
//     if (err) {
//       console.log('Error deleting image:', err);
//     } else {
//       console.log('Image deleted successfully');
//     }
//   });
// }

app.post('/create', async (req, res) => {
  try {
    const ProductJson = {
      search_image: req.body.search_image,
      brands_filter_facet: req.body.brands_filter_facet,
      price: req.body.price,
      product_additional_info: req.body.product_additional_info
    };
    const response = db.collection('products').add(ProductJson)
    
    res.redirect('/home');
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

app.post('/update/:id', async (req, res) => {
  try {
    // const styleid = req.body.styleid;
    // const newName = 'nameeeee';
    const ProductRef = await db.collection('products').doc(req.params.styleid)
      .update({
        search_image: req.body.search_image,
        brands_filter_facet: req.body.brands_filter_facet,
        price: req.body.price,
        product_additional_info: req.body.product_additional_info
      });
    
    res.redirect('/home');
  } catch (error) {
    res.send(error);
  }
})

app.delete('/delete/:id', async (req, res) => {
  try {
    const response = await db.collection('products').doc(req.params.styleid).delete();
    
    res.redirect('/home');
  } catch (error) {
    res.send(error);
  }
})


// app.post('/create', async (req, res) => {
//   const { product_name, product_price } = req.body;
//   const imagePath = req.file.path;
//   const base64Image = convertImageToBase64(imagePath);

//   const product = new Product({
//     product_name,
//     product_price,
//     product_image: base64Image,
//   });

//   await product.save();
//   res.redirect('/home');
// });

// app.post('/delete/:id', async (req, res) => {
//   const id = req.params.id;

//   try {
//     const product = await Product.findByIdAndDelete(id);
//     res.redirect('/home');
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.post('/edit/:id', upload.single('product_image'), async (req, res) => {
//   const id = req.params.id;
//   const { product_name, product_price } = req.body;

//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).render('404');
//     }

//     if (req.file) {
//       const imagePath = req.file.path;
//       const base64Image = convertImageToBase64(imagePath);

//       if (product.product_image) {
//         deleteImage(product.product_image);
//       }

//       product.product_image = base64Image;
//     }

//     product.product_name = product_name;
//     product.product_price = product_price;

//     await product.save();

//     res.redirect('/home');
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// });


// app.get('/search', async (req, res) => {
//     const search = req.query.q;
//     try {
//         const product = await Product.find({ $or: [{ product_name: search }] });
//         res.render('home.hbs', { arrProduct: product.map(product => product.toJSON()) });
//     } catch (err) {

//         res.sendStatus(500);
//     }
// })

module.exports = app;
