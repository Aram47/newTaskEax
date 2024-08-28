const express = require('express');
const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');
const client = new MongoClient("mongodb://localhost:27017");
const app = express();
const PORT = 3003;
const dbName = "aramminasyandb";
const Product = {
    name : "",
    price: 0.0,
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


client.connect();
const db = client.db(dbName);
const collection = db.collection('products');

app.get('/', (req, res) => {
	res.status(200).send("Hello World!!!");
});

app.get('/products', async (req, res) => {
    res.status(200).send(await collection.find().toArray());
});
   
app.post('/products', async (req, res) => {
    const {name, price} = req.body;
    Product.name = name;
    Product.price = price;
    await collection.insertOne(Product);
    res.status(200).send("product is created!!!");
});

app.listen(PORT, () => {
    console.log(`Server listen at PORT: ${PORT}`);
});
