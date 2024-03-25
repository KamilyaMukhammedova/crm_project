require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000;
const app = express();

const authRouters = require('./routers/auth');
const bonusStatiscRouters = require('./routers/bonus-statistic');
const newsRouters = require('./routers/news');
const collectionsRouters = require('./routers/collections');
const promotionsRouters = require('./routers/promotions');
const imageRouter = require('./routers/image');
const errorMiddleware = require('./middlewares/error-middleware');
const {GENERAL_AUTH_ROUTE_PATH, GENERAL_ROUTE_PATH, CLASSIFICATORS_ROUTE_PATH} = require("./constants");

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(GENERAL_AUTH_ROUTE_PATH, authRouters);
app.use(GENERAL_ROUTE_PATH, bonusStatiscRouters);
app.use(GENERAL_ROUTE_PATH, newsRouters);
app.use(GENERAL_ROUTE_PATH, collectionsRouters);
// app.use('/news', newsRouters);
app.use(GENERAL_ROUTE_PATH, promotionsRouters);
app.use(CLASSIFICATORS_ROUTE_PATH, imageRouter);
app.use(errorMiddleware);


const run = async () => {
  await mongoose.connect(process.env.DB_URL);

  app.listen(PORT, () => {
    console.log('Server started on port  ' + PORT);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));