
const ctx = require("./context");
const functional = require("./functional");


exports.overwatch = (requests, results) => {
    overwatch = new ctx.controller(
        "https://www.over.gg/matches/results",
        functional.html_www_game_gg_tournament_parser,
        "Run parse overwatch"
    );
    console.log(results);
    overwatch.get_result(requests, results);
    console.log(results);
}
