
const ctx = require("./context");
const functional = require("./game_gg/tournament");

function CreateValorantController()
{
    return new ctx.controller(
        "https://www.vlr.gg/matches/results",
        functional.html_game_gg_tournament_parser,
        "Run parse valorant"
    );
}

exports.valorant = (requests, results) => {
    CreateValorantController().get_fetch_and_view_data(requests, results);
}
