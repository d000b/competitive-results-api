
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

    $(".allres", html).each(function() {
        $(".results-sublist", this).each(function() {                
            const timeline = $(".standard-headline", this).text();
            data[timeline] = get_result_tables(this, timeline);
        })
    })
}

module.exports.html_htlv_tournament_parser = hltv_result_matches_parser;
