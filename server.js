const express = require('express');
const app = express();
const db = require('./db');
const {Resturant, Menu, MenuItems} = require('./resturantItems');
const seed = require('./data/seed');
const port = 3000;

app.get('/', async (req, res) => {
	res.send('<h1>Hello!</h1>')
})

app.get('/Resturants', async (req, res) => {
    const resturant1 = await Resturant.findAll();
	res.json({resturant1})
})
app.get('/Resturants/:id', async (req, res) => {
    const resturant = await Resturant.findByPk(req.params.id);
	res.json({resturant})
})

app.get('/Menu', async (req, res) => {
    const menu1 = await Menu.findAll();
	res.json({menu1})
})
app.get('/Menu/:id', async (req, res) => {
    const menu = await Menu.findByPk(req.params.id);
	res.json({menu})
})

app.get('/MenuItems', async (req, res) => {
    const items = await MenuItems.findAll();
	res.json({items})
})
app.get('/MenuItems/:id', async (req, res) => {
    const item = await MenuItems.findByPk(req.params.id);
	res.json({item})
})

app.listen(port, async() => {
    await seed()
    console.log(`Server is listening on http://localhost:${port}`)
})
