const fs = require('fs');
const cart = [];

fs.readFile('../data/cart.json', 'utf8', (error, data) => {
    if(error) {
        console.log(error)
    } else cart.push(JSON.parse(data));
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

module.exports = { checkBody };