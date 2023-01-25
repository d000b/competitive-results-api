
const get_home_controller_to_router = require('./home').routes;
const get_game_controller_to_router = require('./game').routes;
const get_testes_controller_to_router = require('./testes/controllers').routes;


function get_controller_to_router(router)
{
    get_home_controller_to_router(router);

    get_game_controller_to_router(router);

    get_testes_controller_to_router(router);
}

module.exports.routes = get_controller_to_router;
