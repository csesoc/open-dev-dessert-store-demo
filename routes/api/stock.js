const express = require('express');
const router = express.Router();
const storeDB = require('../../store.json');
const fs = require('fs/promises');

// [DEMO] Total stock of all remaining items in store
router.get('/', (req, res) => {
    // Loop through and add up
    let stock = 0;
    storeDB.forEach((item) => {
        stock += item.stock;
    })
    res.json(stock);
})

// [DEMO] Total stock for a given category
router.get('/category/:category', (req, res) => {
    let stock = 0;
    storeDB.forEach((item) => {
        if (req.params.category === item.category) {
            stock += item.stock
        }
    })
    res.json(stock);
})

// [DEMO] Total stock for a given item
router.get('/item/:item', (req, res) => {
    let stock = 0;
    storeDB.forEach((item) => {
        if (req.params.item === item.name) {
            stock += item.stock
        }
    })
    res.json(stock);
})

// [DEMO] Adjust stock of an item
router.post('/:item', async (req, res) => {
    let fileData = await fs.readFile('./store.json');
    fileData = JSON.parse(fileData);
    
    let item = fileData.find((item) => item.name === req.params.item);
    console.log("item is " + item);
    console.log("req.params.item is " + req.params.item)

    if (item === undefined) {
        res.status(400).send("Bad request L")
        return;
    }

    console.log(req.body);
    console.log("req.body.stock is " + req.body.stock)
    item.stock = Number(req.body.stock);


    await fs.writeFile('./store.json', JSON.stringify(fileData));
    res.status(200);
});

// [DEMO] Add new item

// [DEMO] Delete item

module.exports = router;