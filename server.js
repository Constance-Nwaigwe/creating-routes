const express = require('express');
const app = express();
const db = require('./db');
const {Resturant, Menu, MenuItems} = require('./resturantItems');
const seed = require('./data/seed');
const port = 3000;

app.use(express.json())

app.get('/', async (req, res) => {
	res.send('<h1>Hello!</h1>')
})

app.get('/Resturant', async (req, res) => {
    const resturant1 = await Resturant.findAll();
	res.json({resturant1})
})
app.get('/Resturant/:id', async (req, res) => {
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

app.get('/MenuItem', async (req, res) => {
    const items = await MenuItems.findAll();
	res.json({items})
})
app.get('/MenuItem/:id', async (req, res) => {
    const item = await MenuItems.findByPk(req.params.id);
	res.json({item})
})

//post
app.post('/Resturant', async (req,res) => {
    const newres = await Resturant.create(req.body)
    res.json({newres});
})
app.post('/Menu', async (req,res) => {
    const newmenu = await Menu.create(req.body)
    res.json({newmenu});
})
app.post('/MenuItem', async (req,res) => {
    const newitem = await MenuItems.create(req.body)
    res.json({newitem});
})

//put
app.put('/Resturant/:id', async (req,res) => {
    const res1 = await Resturant.update({name: req.body.name, location: req.body.location}, {where: {id: req.params.id}})
    res.json({res1});
})
app.put('/Menu/:id', async (req,res) => {
    const menu = await Menu.update({title: req.body.title, calories: req.body.calories}, {where: {id: req.params.id}})
    res.json({menu});
})
app.put('/MenuItem/:id', async (req,res) => {
    const item = await MenuItems.update({recipe: req.body.recipe, cost: req.body.cost}, {where: {id: req.params.id}})
    res.json({item});
})

//delete
app.delete('/Resturant/:id', async (req,res) => {
    await Resturant.destroy({where: {id: req.params.id}})
    res.json({message: `${req.params.id} is destroyed`});
})
app.delete('/Menu/:id', async (req,res) => {
    await Menu.destroy({where: {id: req.params.id}})
    res.json({message: `${req.params.id} is destroyed`});
})
app.delete('/MenuItem/:id', async (req,res) => {
    await MenuItems.destroy({where: {id: req.params.id}})
    res.json({message: `${req.params.id} is destroyed`});
})

app.listen(port, async() => {
    await seed()
    console.log(`Server is listening on http://localhost:${port}`)
})
