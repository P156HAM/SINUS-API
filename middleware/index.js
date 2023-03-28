const fs = require('fs');
let cart = [];

fs.readFile('../data/cart.json', 'utf8', (error, data) => {
    if(error) {
        console.log(error)
    } else cart = (JSON.parse(data));
    console.log(cart);
})

function checkBody(request, response, next) {
    const productBody = request.body;

    if(productBody?.title && productBody?.price && productBody?.shortDesc && productBody?.imgFile && productBody?.serial) {
        cart.forEach((product) => {
            if(product.serial === productBody.serial) {
                response.status(400).json({
                    sucess: false,
                    message: "Product already exist in cart!"
                })
            } else next(); 
        })
    } else {
        response.status(400).json({
            sucess: false,
            error: "Wrong data in request body"
        })
    } 
}

function deleteProdukt(request, response, next) {
    const productBody = request.body;
    if(productBody?.serial) {
        serial = request.params.id
        console.log('cart:' + cart)
        const cartFiltered = cart.filter((product) => product.serial !== serial)
        console.log('cartFiltered:' + cartFiltered)
        fs.writeFile('../data/cart.json', JSON.stringify(cartFiltered), (error) => {
            if(error) {
                console.log(error);
            }
        })
        next()
    } else {
        response.status(400).json({
            sucess: false,
            error: "Wrong data in request body"
        })
    }
}

module.exports = { checkBody, deleteProdukt };