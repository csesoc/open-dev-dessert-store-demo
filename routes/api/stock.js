const express = require('express');
const router = express.Router();
const storeDB = require('../../store.json');

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

// [DEMO] Add a new item



// [DEMO] Adjust stock of an item

module.exports = router;