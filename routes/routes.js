module.exports = app => {
    const router = require("express").Router();
    const controller = require("../controllers/controller");
    
    router.get("/", (request, results) => {
        rest_format = request.query.fmt;
        
        if ("json" == rest_format)
        {
            results.send(json_message);
        }
        else if (true || "html" == rest_format)
        {
            const filesystem = require('fs');

            filesystem.readFile('routes/index.html', 'utf8', (file_error, file_data) => {
                if (file_error)
                {
                    console.error(file_error);
                    
                    results.send(json_message);
                }
                else
                {
                    results.send(file_data);
                }
            });
        }
    })

    router.get("/csgo", controller.csgoResults);

    router.get("/vava", controller.vavaResults);

    router.get("/overw", controller.overwResults);

    app.use("/", router);
}
