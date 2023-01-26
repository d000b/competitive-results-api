
const cheerio = require("cheerio");


function  hltv_result_matches_parser(html)
{
    const $ = cheerio.load(html);

    var get_hltv_result_tables = function(This, timeline)
    {
        let tables = [];
        $(".result-con", This).each(function() {
            const link = $(".a-reset", this).attr('href');
            const event = $(".event-name", this).text();
            const teamWon = $(".team-won", this).text();
            const teamLost = $(".team:not(.team-won)", this).text();
            const scoreWon = $(".score-won", this).text();
            const scoreLost = $(".score-lost", this).text();
            
            tables.push({
                "date": timeline,
                event,
                link,
                teamWon,
                teamLost,
                scoreWon,
                scoreLost
            });
        })
        return tables;
    }

    const hltv = { };
    $(".allres", html).each(function() {
        // TODO, FIX, BUG: @d000b
        // When getting all items with the class '.results-sublist' one (first) item is missing and all tables are shifted by dates.
        $(".results-sublist", this).each(function() { 
            const headline = $(".standard-headline", this).text();
            hltv[headline] = get_hltv_result_tables(this, headline);
        })
    })

    return hltv;
}

module.exports.html_htlv_tournament_parser = hltv_result_matches_parser;
