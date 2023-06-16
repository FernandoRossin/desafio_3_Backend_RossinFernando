const express = require('express')

const {ProductManager} = require('./ProductManager')
const app = express()


const productManager = new ProductManager('./Productos.json')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(8080,()=>{
    console.log('Escuchando puerto 8080');
})

app.get('/productos',async (request,response)=>{
   try {
        const products = await productManager.getProducts()
        const limit = request.query.limit

        limit ? response.send(products.slice(0, limit)) : response.send( products )  
    } catch (error) {
        console.log(error)
    }

})

app.get('/producto/:id', async (request, response) => {
    try {
        const params = Number(request.params.id)
        const product = await productManager.getProductById(params)
        response.send(product)

    } catch (error) {
        console.log(error)
    }

})


