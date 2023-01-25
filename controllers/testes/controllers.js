
const hltv = require('../hltv/controllers');
const game_gg = require('../game_gg/controllers');


function get_adding_path_test_controllers()
{
    return "/test"
}

function get_testes_controller_to_router(router)
{
    const module_path = get_adding_path_test_controllers();

    router.get(module_path + "/hltv", hltv);

    router.get(module_path + "/game_gg", game_gg);
}

module.exports.routes = get_testes_controller_to_router;
