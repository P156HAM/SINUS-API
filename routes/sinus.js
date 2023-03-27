const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
const { checkBody } = require('../middleware/index.js')
const products = require('../data/products.json');

app.use(express.json());

const cart = [];

app.get('/products', (request, response ) => {

    const filterdProducts = products.map((product) => {
        const newProducts = {
            title: product.title,
            price: product.price,
            shortDesc: product.shortDesc,
            imgFile: product.imgFile
        }
        return newProducts;
    })

    response.json({
        sucess: true,
        products: filterdProducts
    })
})

app.post('/products', checkBody, (request, response) => {
    const addedProduct = request.body;
    const { title, price, shortDesc, imgFile, serial} = addedProduct

    fs.writeFile('../data/cart.json', JSON.stringify(addedProduct), (error) => {
        if(error) {
            console.log(error);
        }
    })
    cart.push({ title: title, price: price, shortDesc: shortDesc, imgFile: imgFile, serial: serial })

    response.json({
        sucess: true,
        message: "product added succesfully"
    })
})

app.listen(PORT, () => {
    console.log("listning on port 8000")
})
