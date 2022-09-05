const express = require(`express`);
const storeDB = require(`./store.json`);
const moment = require(`moment`);
const stockRouter = require('./routes/api/stock');

// Init express
const app = express();

// Middleware is like a sequence of functions that runs in between
// your endpoint and return
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

// Init middleware
app.use(logger);
app.use(express.json());

// Stock routes
app.use('/api/stock', stockRouter);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


