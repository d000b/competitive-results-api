
const ctx = require("./context");
const functional = require("./functional");


exports.vavaResults = (requests, results) => {
    valorant = ctx.ControllerContext(
        "https://www.vlr.gg/matches/results",
        functional.www_game_gg_parser,
        "Run parse valorant"
    );

    return valorant.get_result();
}
