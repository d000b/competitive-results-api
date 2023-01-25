
const ctx = require("./context");
const functional = require("./game_gg/tournament");


exports.overwatch = (requests, results) => {
    overwatch = new ctx.controller(
        "https://www.over.gg/matches/results",
        functional.html_game_gg_tournament_parser,
        "Run parse overwatch"
    );
    
    overwatch.get_result(requests, results);
}
