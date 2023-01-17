
const csgo_tournament_results = require("./csgo");
const valorant_tournament_results = require("./valorant");
const overwatch_tournament_results = require("./overwatch");


export function get_controller_to_router(router)
{
    router.get("/csgo", controller.csgo_tournament_results);

    router.get("/valorant", controller.valorant_tournament_results);

    router.get("/overwatch", controller.overwatch_tournament_results);
}
