module.exports = app => {
    const router = require("express").Router();
    const controller = require("../controllers/controller");
    
    router.get("/", (req, res) => {
        console.log("Padrao")
        res.send({message: "opa"});
    })

    router.get("/csgo", controller.csgoResults);

    router.get("/vava", controller.vavaResults);

    router.get("/overW", controller.overWResults);

    app.use("/", router);

}