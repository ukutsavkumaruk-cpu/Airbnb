const express = require('express')
const { getHome,getBookings,getFavourites,getHomeDetail,postAddToFavourite,postDeleteFavourite} = require('../controllers/storeController');



const storeRouter = express.Router();

storeRouter.get("/",getHome)
storeRouter.get("/store/bookings",getBookings)
storeRouter.get("/store/favourite-list",getFavourites)
storeRouter.get("/store/home-detail/:homeID",getHomeDetail)
storeRouter.post("/store/favourite-list",postAddToFavourite)
storeRouter.post("/store/favourite-list/delete",postDeleteFavourite)

module.exports = storeRouter;