
const csv = require("./csv");
const html = require("./html");
const json = require("./json");


function default_view()
{
    return json.modelview; 
}

function get_viewer_from_key(key)
{
    if ("csv" === key)
    {
        return csv.modelview;
    }
    else if ("html" === key)
    {
        return html.modelview;
    }
    else if ("json" === key)
    {
        return json.modelview;
    }
    else
    {
        return default_view();
    }
}

module.exports.viewer_from_key = get_viewer_from_key;
