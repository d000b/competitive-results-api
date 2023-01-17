
const csgo_tournament_results = require('./csgo').csgo;
const valorant_tournament_results = require('./valorant').valorant;
const overwatch_tournament_results = require('./overwatch').overwatch;


function get_controller_to_router(router)
{
    router.get("/csgo", csgo_tournament_results);

    router.get("/valorant", valorant_tournament_results);

    router.get("/overwatch", overwatch_tournament_results);
}

module.exports.routes = get_controller_to_router;
