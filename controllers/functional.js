
function replacer(data)
{
    return data.replace(/(\t\n|\n|\t)/gm, "");
}


export function hltv_parser(html, data)
{
    $(".allres", html).each(function() {
        $(".results-sublist", this).each(function() {                
            const headline = $(".standard-headline", this).text();
            data[headline] = [];
            
            $(".result", this).each(function() {
                const teamWon = $(".team-won", this).text();
                const teamLost = $(".team:not(.team-won)", this).text();
                const scoreWon = $(".score-won", this).text();
                const scoreLost = $(".score-lost", this).text();
                const eventName = $(".event-name", this).text();    
                
                data[headline].push({
                    "date": 
                        headline,
                        teamWon,
                        teamLost,
                        scoreWon,
                        scoreLost,
                        eventName
                })
            })
        })
    })
}


export function www_game_gg_parser(html, data)
{
    const labels = [];
    const cards = [];
    const data = {};

    $(".wf-label", html).each(function() {            
        const date = replacer(this.children[0].data);
        labels.push(date);
    })

    let i = 0;
    $(".wf-card:not(.mod-header)", html).each(function() {            
        const cardList = [];
        
        $(".wf-module-item", this).each(function() {
            const divTeamLost = $(".match-item-vs-team:not(.mod-winner)", this);
            const divTeamWon = $(".mod-winner", this);
            
            let teamLost;
            let scoreLost;
            let teamWon;
            let scoreWon;
            const eventName = replacer($(".match-item-event-series", this).text());                
            
            if (1 == divTeamLost.length)
            {
                teamLost = replacer($(".flag", divTeamLost)["0"]["next"].data);
                scoreLost = replacer($(".match-item-vs-team-score", divTeamLost).text());
                teamWon = replacer($(".flag", divTeamWon)["0"]["next"].data);
                scoreWon = replacer($(".match-item-vs-team-score", divTeamWon).text());
            }
            else
            {
                teamLost = replacer($(".flag", divTeamLost[0])["0"]["next"].data);                    
                scoreLost = replacer($(".match-item-vs-team-score", divTeamLost[0]).text());                    
                teamWon = replacer($(".flag", divTeamLost[1])["0"]["next"].data);                    
                scoreWon = replacer($(".match-item-vs-team-score", divTeamLost[1]).text());                    
            }
            
            cardList.push({
                "date": labels[i],
                teamWon,
                teamLost,
                scoreWon,
                scoreLost,
                eventName
            });
        });
        
        i++;
        cards.push(cardList);
    })
    
    i = 0;
    for (label in labels)
    {
        data[label] = [];
        
        cards[i].forEach(element => {                
            data[label].push(element);
        });
        
        ++i;
    }
}
