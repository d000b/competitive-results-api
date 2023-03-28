
const sender = require("./sender");


var home_response = function(request, results)
{
    rest_format = request.query['view'];
    
    if ("json" == rest_format)
    {
        sender.send_data_from_file('root/index.json', results);
    }
    else if ("html" == rest_format || true)
    {
        sender.send_data_from_file('root/index.html', results);
    }
}


function get_home_controller_to_router(router)
{
    router.get("/", (request, results) => { results.redirect("/home") });

    router.get("/home", home_response);
}

module.exports.routes = get_home_controller_to_router;
