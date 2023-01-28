
const cheerio = require("cheerio");


function  get_formmated_date(date, began_index)
{
    return date.slice(began_index);
}

function  get_static_date_string(date_string_wrap)
{
    return date_string_wrap.slice(
        date_string_wrap.indexOf("'") + 1,
        date_string_wrap.lastIndexOf("'")
    );
}

function  hltv_result_matches_parser(html)
{
    const field = cheerio.load(html)(".allres", html);
    const $ = cheerio.load(field.html());

    var get_hltv_result_tables = function(This, date_offset_wrapper)
    {
        const tables = [];
        const headline = $(".standard-headline", This).text();
        const timeline = get_formmated_date(headline, date_offset_wrapper);

        $(".result-con", This).each(function() {
            const link = $(".a-reset", this).attr('href');
            const event = $(".event-name", this).text();
            const teamWon = $(".team-won", this).text();
            const teamLost = $(".team:not(.team-won)", this).text();
            const scoreWon = $(".score-won", this).text();
            const scoreLost = $(".score-lost", this).text();
            
            tables.push({
                timeline,
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

    const matches = [];
    field.each(function() {
        const headline_format = $(".results-all", this).attr("data-zonedgrouping-headline-format");
        const date_offset_string_wrapper = get_static_date_string(headline_format).length + 1;
        // TODO, FIX, BUG: @d000b
        // When getting all items with the class '.results-sublist' one (first) item is missing and all tables are shifted by dates.
        $(".results-sublist", this).each(function() {
            const tables = get_hltv_result_tables(this, date_offset_string_wrapper);

            tables.forEach((element) => matches.push(element));
        })
    })

    return { matches };
}

module.exports.html_htlv_tournament_parser = hltv_result_matches_parser;
