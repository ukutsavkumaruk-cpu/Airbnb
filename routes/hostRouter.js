const express = require('express');
const { getAddHome, postAddHome,getHostHomeList,getEditHome,postEditHome,getDeleted} = require('../controllers/hostController');

const hostRouter = express.Router();

hostRouter.get("/host/add-Home",getAddHome)
hostRouter.post("/host/add-Home",postAddHome)
hostRouter.get("/host/host-home-list",getHostHomeList)
hostRouter.get("/host/edit-Home/:homeId",getEditHome)
hostRouter.post("/host/edit-Home/:homeId",postEditHome)
hostRouter.get("/host/host-home-list/:homeId",getDeleted)

exports.hostRouter = hostRouter;
