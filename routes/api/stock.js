const express = require('express');
const router = express.Router();
const storeDB = require('../../store.json');
const db = require('../../db.js');

const coll = db.getDb().collection("store")

// [DEMO] Total stock of all remaining items in store
router.get('/', async (req, res) => {
    // Loop through and add up
    let stock = 0;
    // storeDB.forEach((item) => {
    //     stock += item.stock;
    // })
    await coll.find().forEach((item) => {
        stock += item.stock;
    })
    res.json(stock);
})

// [DEMO] Total stock for a given category
router.get('/category/:category', async (req, res) => {
    let stock = 0;

    // storeDB.forEach((item) => {
    //     if (req.params.category === item.category) {
    //         stock += item.stock
    //     }
    // })
    const dessertStore = db.getDb();
    await dessertStore.collection("store").find(req.params).forEach((item) => {
        stock += item.stock;
    })
    res.json(stock);
})

// [DEMO] Total stock for a given item
router.get('/item/:item', async (req, res) => {
    let stock = 0;
    // storeDB.forEach((item) => {
    //     if (req.params.item === item.name) {
    //         stock += item.stock
    //     }
    // })
    const dessertStore = db.getDb();
    await dessertStore.collection("store").find({"name": req.params.item}).forEach((item) => {
        stock += item.stock;
    })
    res.json(stock);
})

// [DEMO] Add a new item



// [DEMO] Adjust stock of an item
router.put('/adjust/:item/:stock', async (req, res) => {
    const dessertStore = db.getDb();
    await dessertStore.collection("store").updateOne(
        { name: req.params.item },
        { $set: {"stock": req.params.stock} }
    );
    res.json("success")
})

module.exports = router;