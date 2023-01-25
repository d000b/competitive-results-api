
const filesystem = require('fs');
const sender = require("./sender");


var home_response = function(request, results)
{
    rest_format = request.query.fmt;
    
    if ("json" == rest_format)
    {
        sender.send_data_from_file(filesystem, 'root/index.json', results);
    }
    else if (true || "html" == rest_format)
    {
        sender.send_data_from_file(filesystem, 'root/index.html', results);
    }
}


function get_home_controller_to_router(router)
{
    router.get("/home", home_response);
}

module.exports.routes = get_home_controller_to_router;
