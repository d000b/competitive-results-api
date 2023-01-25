
const cheerio = require("cheerio");


function hltv_result_matches_parser(html, data)
{
    const $ = cheerio.load(html);

    var get_result_tables = function(This, timeline)
    {
        tables = [];

        $(".result", This).each(function() {
            const teamWon = $(".team-won", this).text();
            const teamLost = $(".team:not(.team-won)", this).text();
            const scoreWon = $(".score-won", this).text();
            const scoreLost = $(".score-lost", this).text();
            const eventName = $(".event-name", this).text();    
            
            tables.push({
                "date": timeline,
                teamWon,
                teamLost,
                scoreWon,
                scoreLost,
                eventName
            });
        })
        return tables;
    }

    const csgo = [];
    $(".allres", html).each(function() {
        $(".results-sublist", this).each(function() {                
            const headline = $(".standard-headline", this).text();
            csgo[headline] = get_result_tables(this, headline);
        })
    })

    data = csgo;
}

module.exports.html_htlv_tournament_parser = hltv_result_matches_parser;
