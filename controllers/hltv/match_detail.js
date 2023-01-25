
const cheerio = require("cheerio");


function hltv_match_details_parser(html, data)
{
    const $ = cheerio.load(html);

    var get_team_data = function(This)
    {
        const score = $(".won:or(.lost)", This).text();
        const name = $(".teamName", This).text();
        const link = $(This).attr('href');
        const logo = $(This).children('img').attr('src');

        return {
            name, logo, link, score
        };
    }

    var get_event_data = function(This)
    {
        const time_tree = $(".time", This);
        const time = {
            "format": time_tree.attr('data-time-format'),
            "unix":   time_tree.attr('data-unix'),
            "time":   time_tree.text()
        };

        const event_tree = $(".event", This);
        const event = {
            "link":      event_tree.attr('href'),
            "title":     event_tree.attr('title'),
        };
        
        const status = $(".countdown", This).text();

        return {
            time, event, status
        };
    }

    var get_title = function(This)
    {
        const box = $(".teamsBox", This);

        const event = get_event_data($(".timeAndEvent", this));
        
        const teams = []
        box.each(function() {
            $(".team", this).each(function() {
                teams.push(get_team_data(this));
            })
        })

        return { 
            event, teams 
        };
    }

    const maps_tree = $(".maps", html);

    const action_selection_maps = [];
    $(".padding", $(".veto-box", maps_tree).eq(1)).each((index, element) => {
        selection_maps.push(element.text());
    });


    const maps = [];
    $(".flexbox-column", maps_tree).each((index, element) => {
        const map = element.attr('title');
    })
}

module.exports.html_htlv_detail_parser = hltv_match_details_parser;
