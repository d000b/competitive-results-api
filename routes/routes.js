module.exports = app => {
    const router = require("express").Router();
    const controller = require("../controllers/controller");
    
    router.get("/", (req, res) => {        
        res.send({
            message: "There is one route for each game:",
            CSGO: "/csgo",
            Valorant: "/vava",
            Overwatch: "/overW"
        });
    })

    router.get("/csgo", controller.csgoResults);

    router.get("/vava", controller.vavaResults);

    router.get("/overw", controller.overwResults);

    app.use("/", router);
}
