
const ctx = require("./context");
const functional = require("./game_gg/tournament");


function createOverwatchController()
{
    return new ctx.controller(
        "https://www.over.gg/matches/results",
        functional.html_game_gg_tournament_parser,
        "Run parse overwatch"
    );
}

exports.overwatch = (requests, results) => {
    createOverwatchController().get_fetch_and_view_data(requests, results);
}
