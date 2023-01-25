
module.exports = app => {
    const router = require("express").Router();
    const controller = require("../controllers/controllers");
    
    controller.routes(router);

    app.use("/", router);
}
