const express = require("express");
const { userController } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/get", userController.getData);
routers.post("/login", userController.loginData);


module.exports = routers;
