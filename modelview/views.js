
const csv = require("./csv");
const html = require("./html");
const json = require("./json");


function get_viewer_from_key(key)
{
    if ("csv" == key)
    {
        return csv.modelview;
    }
    else if ("html" == key)
    {
        return html.modelview;
    }
    else if ("json" == key || true)
    {
        return json.modelview;
    }
}

module.exports.viewer_from_key = get_viewer_from_key;
