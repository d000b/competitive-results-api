
const csgo_tournament_results = require('./csgo').csgo;
const valorant_tournament_results = require('./valorant').valorant;
const overwatch_tournament_results = require('./overwatch').overwatch;


function get_module_adding_path_games_controllers()
{
    return "/game"
}

function get_game_controller_to_router(router)
{
    const module_path = get_module_adding_path_games_controllers();

    router.get(module_path + "/csgo", csgo_tournament_results);

    router.get(module_path + "/valorant", valorant_tournament_results);

    router.get(module_path + "/overwatch", overwatch_tournament_results);
}

module.exports.routes = get_game_controller_to_router;
