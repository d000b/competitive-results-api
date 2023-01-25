const cheerio = require("cheerio");


function replacer(data)
{
    return data.replace(/(\t\n|\n|\t)/gm, "");
}

function www_game_gg_parser(html, data)
{
    const labels = [];
    const cards = [];
    const $ = cheerio.load(html);
    
    $(".wf-label", html).each(function() {            
        const date = replacer(this.children[0].data);
        labels.push(date);
    })

    var get_result_tables = function(This, timeline)
    {
        let cardList = []

        $(".wf-module-item", This).each(function(index, element) {
            const match_link = this.attr('href');

            const time = replacer($(".match-item-time", element).text());

            const divTeamLost = $(".match-item-vs-team:not(.mod-winner)", This);
            const divTeamWon = $(".mod-winner", This);

            const eventName = replacer($(".match-item-event-series", This).text());                
            const teamWon = replacer($(".flag", divTeamWon)["0"]["next"].data);
            const teamLost = replacer($(".flag", divTeamLost)["0"]["next"].data);
            const scoreWon = replacer($(".match-item-vs-team-score", divTeamWon).text());
            const scoreLost = replacer($(".match-item-vs-team-score", divTeamLost).text());
            
            cardList.push({
                "date": timeline,
                match_link,
                teamWon,
                teamLost,
                scoreWon,
                scoreLost,
                eventName
            });

            if (1 == divTeamLost.length)
                return;
        });
        return cardList;
    }

    let i = 0;
    $(".wf-card:not(.mod-header)", html).each(function() {            
        const cardList = get_result_tables(this, labels[i]);
        cards.push(cardList);
        ++i;
    })
    
    i = 0;
    for (const label in labels)
    {
        data[label] = [];
        
        cards[i].forEach(element => {                
            data[label].push(element);
        });
        
        ++i;
    }
}

module.exports.html_www_game_gg_tournament_parser = www_game_gg_parser;
