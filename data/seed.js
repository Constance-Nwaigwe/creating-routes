const path = require('path')
const fs = require('fs').promises
const {db} = require("../db")
const {Resturant, Menu, MenuItems} = require("../resturantItems")

const seed = async () => {
    //
    await db.sync({force: true})

    const resturantPath = path.join(__dirname, 'resturant.json')
    //const resturantPath = path.basename('/')
    const MenuPath = path.join(__dirname, 'menu.json')
    const MenuItemPath = path.join(__dirname, 'menuitem.json')

    const resbuffer = await fs.readFile(resturantPath)
    //const resbuffer = await fs.readFile('./resturant')
    const menubuffer = await fs.readFile(MenuPath)
    const menuitemsbuffer = await fs.readFile(MenuItemPath)

    const {resdata} = JSON.parse(String(resbuffer))
    const {menudata} = JSON.parse(String(menubuffer))
    const {menuitemsdata} = JSON.parse(String(menuitemsbuffer))

    const resPromises = resdata.map(res => Resturant.create(res))
    const menuPromises = menudata.map(menu => Menu.create(menu))
    const menuitemPromises = menuitemsdata.map(items => MenuItems.create(items))

    await Promise.all(resPromises)
    await Promise.all(menuPromises)
    await Promise.all(menuitemPromises)

    console.log("success"); 
}

seed();

module.exports = seed;