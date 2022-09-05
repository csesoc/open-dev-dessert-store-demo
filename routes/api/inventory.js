const express = require('express');
const router = express.Router();
const storeDB = require('../../store.json');

router.get('/', (req, res) => {
    // Get the json file
    res.send(storeDB);
});

router.get('/volume', (req, res) => {
    // Loop through and add up
    let volume = 0;
    Object.values(storeDB).forEach((v) => {
        volume += v.volume;
    })
    res.json(volume);
})

router.get()

module.exports = router;