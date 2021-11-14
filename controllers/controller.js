const axios = require("axios");
const cheerio = require("cheerio");

const csgo = {};
const vava = {};
const overw = {};

exports.csgoResults = (req, res) => {
    console.log("Inside csgoResults")
    axios.get("https://www.hltv.org/results")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $(".allres", html).each(function() {
                $(".results-sublist", this).each(function() {                
                    const headline = $(".standard-headline", this).text();
                    csgo[headline] = [];
                    
                    $(".result", this).each(function() {
                        const teamWon = $(".team-won", this).text();
                        const teamLost = $(".team:not(.team-won)", this).text();
                        const scoreWon = $(".score-won", this).text();
                        const scoreLost = $(".score-lost", this).text();
                        const eventName = $(".event-name", this).text();    
                        
                        csgo[headline].push({
                            "date": headline,
                            teamWon,
                            teamLost,
                            scoreWon,
                            scoreLost,
                            eventName
                        })
                    })
                })
            })
            res.json(csgo);
        }).catch(err => console.log);
}

exports.vavaResults = (req, res) => {
    console.log("Inside vavaResults");
    axios.get("https://www.vlr.gg/matches/results")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            const labels = [];
            const cards = [];

            $(".wf-label", html).each(function() {            
                const date = this.children[0].data.replace(/(\t\n|\n|\t)/gm, "");
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
                    const eventName = $(".match-item-event-series", this).text().replace(/(\t\n|\n|\t)/gm, "");                
                    
                    if(divTeamLost.length == 1) {
                        teamLost = $(".flag", divTeamLost)["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");
                        scoreLost = $(".match-item-vs-team-score", divTeamLost).text().replace(/(\t\n|\n|\t)/gm, "");
                        teamWon = $(".flag", divTeamWon)["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");
                        scoreWon = $(".match-item-vs-team-score", divTeamWon).text().replace(/(\t\n|\n|\t)/gm, "");
                    }
                    else {                    
                        teamLost = $(".flag", divTeamLost[0])["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");                    
                        scoreLost = $(".match-item-vs-team-score", divTeamLost[0]).text().replace(/(\t\n|\n|\t)/gm, "");                    
                        teamWon = $(".flag", divTeamLost[1])["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");                    
                        scoreWon = $(".match-item-vs-team-score", divTeamLost[1]).text().replace(/(\t\n|\n|\t)/gm, "");                    
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
            
            for(let i = 0; i<labels.length; i++) {
                vava[labels[i]] = [];
                
                cards[i].forEach(element => {                
                    vava[labels[i]].push(element);
                });
            }
            res.json(vava);
        }).catch(err => console.log);
}

exports.overwResults = (req, res) => {
    console.log("Inside overwResults");
    axios.get("https://www.over.gg/matches/results")
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            const labels = [];
            const cards = [];

            $(".wf-label", html).each(function() {            
                const date = this.children[0].data.replace(/(\t\n|\n|\t)/gm, "");
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
                    const eventName = $(".match-item-event-series", this).text().replace(/(\t\n|\n|\t)/gm, "");                
                    
                    if(divTeamLost.length == 1) {
                        teamLost = $(".flag", divTeamLost)["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");
                        scoreLost = $(".match-item-vs-team-score", divTeamLost).text().replace(/(\t\n|\n|\t)/gm, "");
                        teamWon = $(".flag", divTeamWon)["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");
                        scoreWon = $(".match-item-vs-team-score", divTeamWon).text().replace(/(\t\n|\n|\t)/gm, "");
                    }
                    else {                    
                        teamLost = $(".flag", divTeamLost[0])["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");                    
                        scoreLost = $(".match-item-vs-team-score", divTeamLost[0]).text().replace(/(\t\n|\n|\t)/gm, "");                    
                        teamWon = $(".flag", divTeamLost[1])["0"]["next"].data.replace(/(\t\n|\n|\t)/gm, "");                    
                        scoreWon = $(".match-item-vs-team-score", divTeamLost[1]).text().replace(/(\t\n|\n|\t)/gm, "");                    
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
            
            for(let i = 0; i<labels.length; i++) {
                overw[labels[i]] = [];
                
                cards[i].forEach(element => {                
                    overw[labels[i]].push(element);
                });
            }
            res.json(overw);
        }).catch(err => console.log);
}