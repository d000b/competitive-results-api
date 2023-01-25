
const ctx = require("./context");
const functional = require("./game_gg/tournament");


exports.valorant = (requests, results) => {
    valorant = new ctx.controller(
        "https://www.vlr.gg/matches/results",
        functional.html_www_game_gg_tournament_parser,
        "Run parse valorant"
    );

    valorant.get_result(requests, results);
}
