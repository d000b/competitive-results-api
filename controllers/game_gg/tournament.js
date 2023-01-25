const cheerio = require("cheerio");


function replacer(data)
{
    return data.replace(/(\t\n|\n|\t)/gm, "");
}

function www_game_gg_parser(html, data)
{
    const $ = cheerio.load(html);
    
    const labels = [];
    $(".wf-label", html).each(function() {            
        const date = replacer(this.children[0].data);
        labels.push(date);
    })

    var get_result_tables = function(This, timeline)
    {
        let cardList = []

        $(".wf-module-item", This).each(function(index, element) {
            const match_link = this.attr('href');

            //  const time = replacer($(".match-item-time", element).text());

            const divTeamLost = $(".match-item-vs-team:not(.mod-winner)", this);
            const divTeamWon = $(".mod-winner", this);

            const eventName = replacer($(".match-item-event-series", this).text());                
            const teamWon = replacer($(".flag", divTeamWon)["0"]["next"].data);
            //  const teamLost = replacer($(".flag", divTeamLost)["0"]["next"].data);
            const scoreWon = replacer($(".match-item-vs-team-score", divTeamWon).text());
            const scoreLost = replacer($(".match-item-vs-team-score", divTeamLost).text());
            
            cardList.push({
                "date": timeline,
                match_link,
                teamWon,
                //  teamLost,
                scoreWon,
                scoreLost,
                eventName
            });

            if (1 == divTeamLost.length)
                return;
        });
        return cardList;
    }

    const cards = [];
    $(".wf-card:not(.mod-header)", html).each(function(element, index) {            
        cards.push(get_result_tables(element, labels[index]));
    })
    
    stored_data = [];
    for (const index in labels)
    {
        const label = labels[index];
        
        stored_data[label] = [];
        cards[index].forEach(element => stored_data[label].push);
    }
    data = stored_data;
}

module.exports.html_game_gg_tournament_parser = www_game_gg_parser;
