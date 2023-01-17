
module.exports = app => {
    const router = require("express").Router();
    const filesystem = require('fs');
    const controller = require("../controllers/controllers");
    const sender = require("./sender");
    
    router.get("/", (request, results) => {
        rest_format = request.query.fmt;
        
        if ("json" == rest_format)
        {
            sender.send_data_from_file(filesystem, 'root/index.json', results);
        }
        else if (true || "html" == rest_format)
        {
            sender.send_data_from_file(filesystem, 'root/index.html', results);
        }
    })

    controller.routes(router);

    app.use("/", router);
}
