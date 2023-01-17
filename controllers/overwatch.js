
const ctx = require("./context");
const functional = require("./functional");


exports.overwResults = (requests, results) => {
    overwatch = ctx.ControllerContext(
        "https://www.over.gg/matches/results",
        functional.www_game_gg_parser,
        "Run parse overwatch"
    );

    return overwatch.get_result();
}
