
const csgo_tournament_results = require('./csgo').csgo;
const valorant_tournament_results = require('./valorant').valorant;
const overwatch_tournament_results = require('./overwatch').overwatch;


function get_module_adding_path_games_controllers()
{
    return "";// change ?-> 'root/index.html', 'root/index.json'
}

function get_pair_path_route(path, route)
{
    console.log(path);
    return { 
        path, route 
    };
}

function accept_route_from_controllers(router, controllers)
{
    for (index in controllers)
    {
        const controller = controllers[index];
      
        router.get(controller.path, controller.route);
    }    
}

function get_game_controller_pairs()
{
    const routes = [];
    const module_path = get_module_adding_path_games_controllers();

    routes.push(get_pair_path_route(module_path + "/csgo", csgo_tournament_results));
    routes.push(get_pair_path_route(module_path + "/valorant", valorant_tournament_results));
    routes.push(get_pair_path_route(module_path + "/overwatch", overwatch_tournament_results));

    return routes;
}

function get_game_controller_to_router(router)
{
    const controllers = get_game_controller_pairs();

    accept_route_from_controllers(router, controllers)
}

module.exports.routes = get_game_controller_to_router;
