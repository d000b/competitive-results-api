
const ctx = require("./context");
const functional = require("./functional");


exports.csgo = (requests, results) => {
    csgo = new ctx.controller(
        "https://www.hltv.org/results",
        functional.html_htlv_tournament_parser,
        "Run parse csgo"
    );

    csgo.get_result(requests, results);
}
