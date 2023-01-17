
const ctx = require("./context");
const functional = require("./functional");


exports.csgoResults = (requests, results) => {
    csgo = ctx.ControllerContext(
        "https://www.hltv.org/results",
        functional.hltv_parser,
        "Run parse csgo"
    );

    return csgo.get_result();
}
