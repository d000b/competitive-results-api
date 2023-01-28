
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

    var get_date_offset = function(This)
    {
        const selector = ".results-all";
        const attribute = "data-zonedgrouping-headline-format";

        const headline_format = $(selector, This).attr(attribute);
        const format_date_string = get_static_date_string(headline_format);

        return format_date_string.length + 1;
    }

    var get_hltv_result_tables = function(This, date_offset_wrapper)
    {
        const tables = [];
        const headline = $(".standard-headline", This).text();
        const timeline = get_formmated_date(headline, date_offset_wrapper);

        $(".result-con", This).each(function() {
            const unix = $(this).attr("data-zonedgrouping-entry-unix");
            const link = $(".a-reset", this).attr('href');
            const event = $(".event-name", this).text();
            const teamWon = $(".team-won", this).text();
            const teamLost = $(".team:not(.team-won)", this).text();
            const scoreWon = $(".score-won", this).text();
            const scoreLost = $(".score-lost", this).text();
            
            tables.push({
                timeline,
                unix,
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
        date_offset_string_wrapper = get_date_offset(this);
        $(".results-sublist", this).each(function() {
            const tables = get_hltv_result_tables(this, date_offset_string_wrapper);

            tables.forEach((element) => matches.push(element));
        })
    })

    return { matches };
}

module.exports.html_htlv_tournament_parser = hltv_result_matches_parser;
