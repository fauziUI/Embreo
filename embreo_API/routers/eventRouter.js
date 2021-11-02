const express = require("express");
const { eventController } = require("../controllers");
const routers = express.Router();

routers.get("/get", eventController.getData);
routers.get("/get-detail", eventController.getDetail);
routers.post("/add-proposed", eventController.addData);
routers.get("/get-order", eventController.getOrder);
routers.patch("/reject-order/:id_proposed", eventController.rejectOrder);
routers.patch("/confirm-order/:id_proposed", eventController.confirmOrder);

module.exports = routers;
