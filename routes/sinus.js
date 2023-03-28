const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const fs = require('fs');
const { checkBody, deleteProdukt } = require('../middleware/index.js')
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

    fs.readFile('../data/cart.json', 'utf8', (error, data) => {
        if (error) {
            console.log(error)
        } else {
            // Konverterar JSON-data till en JavaScript-array
            const currentCart = JSON.parse(data);
            console.log("currentCart:", currentCart);

            // Lägger till den nya produkten i arrayen
            currentCart.push({ title, price, shortDesc, imgFile, serial })

            // Skriver den uppdaterade arrayen till cart.json-filen
            fs.writeFile('../data/cart.json', JSON.stringify(currentCart), (error) => {
                if(error) {
                    console.log(error);
                }
            })
        }
    })

    
    cart.push({ title: title, price: price, shortDesc: shortDesc, imgFile: imgFile, serial: serial })

    response.json({
        sucess: true,
        message: "product added succesfully"
    })
})

app.delete('/products/:id', deleteProdukt, (request, response) => {
    response.json({
        sucess: true,
        message: "Your todo has been deleted!",
    })
})

app.listen(PORT, () => {
    console.log("listning on port 8000")
})
