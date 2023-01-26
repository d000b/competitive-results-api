
const cheerio = require("cheerio");


function replacer(data)
{
    return data.replace(/(\t\n|\n|\t)/gm, "");
}

function www_game_gg_parser(html)
{
    const $ = cheerio.load(html);

    var get_match_teams = function(collection_teams)
    {
        const teams = [];
        collection_teams.each(function() {
            const name = replacer($(".flag", this)["0"]["next"].data);
            const score = replacer($(".match-item-vs-team-score", this).text());
            const winner = $(this).hasClass("mod-winner");
            
            teams.push({
                name, score, winner
            });
        })
        return teams;
    }

    var get_match_item = function(item, timeline)
    {
        const link = $(item).attr('href');

        const time = replacer($(".match-item-time", item).text());
        
        const teams = get_match_teams($(".match-item-vs-team", item));

        const event = replacer($(".match-item-event-series", item).text());

        return {
            timeline,
            time,
            event,
            link,
            teams
        };
    }

    var get_game_gg_result_tables = function(This, timeline)
    {
        const items = $(".wf-module-item", This);
        
        let cardList = []
        items.each(function () {
            cardList.push(get_match_item(this, timeline));
        })

        return cardList;
    }

    var get_timeline_labels = function(html)
    {
        const labels = [];
        $(".wf-label", html).each(function() {            
            const date = replacer(this.children[0].data);
            labels.push(date);
        })
        
        return labels;
    }

    var get_match_cards = function(html, labels)
    {
        const cards = [];
        let index = 0;
        $(".wf-card:not(.mod-header)", html).each(function() {
            cards.push(get_game_gg_result_tables(this, labels[index++]));
        })

        return cards;
    }
    
    const labels = get_timeline_labels(html);
    
    const cards = get_match_cards(html, labels);
    
    const stored_data = { };
    for (const index in labels)
    {
        const label = labels[index];
        const store = stored_data[label] = [];
        cards[index].forEach(element => store.push(element));
    }

    return stored_data;
}

module.exports.html_game_gg_tournament_parser = www_game_gg_parser;
