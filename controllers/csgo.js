
const ctx = require("./context");
const hltv = require("./hltv/controllers");


exports.csgo = (requests, results) => {
    csgo = new ctx.controller(
        "https://www.hltv.org/results",
        hltv.html_htlv_tournament_parser,
        "Run parse csgo"
    );

    csgo.get_result(requests, results);
}
