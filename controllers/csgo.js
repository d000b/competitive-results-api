
const ctx = require("./context");
const hltv = require("./hltv/controllers");


function CreateCSGOController()
{
    return new ctx.controller(
        "https://www.hltv.org/results",
        hltv.html_htlv_tournament_parser,
        "Run parse csgo"
    );
}

exports.csgo = (requests, results) => {
    CreateCSGOController().get_fetch_and_view_data(requests, results);
}
