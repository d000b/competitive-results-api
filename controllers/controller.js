const axios = require("axios");
const cheerio = require("cheerio");

const csgo = {};

exports.csgoResults = (req, res) => {
    console.log("Inside csgoResults")
    axios.get('https://www.hltv.org/results')
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            $(".allres", html).each(function() {
                $('.results-sublist', this).each(function() {                
                    const headline = $(".standard-headline", this).text();
                    csgo[headline] = [];
                    
                    $(".result", this).each(function() {
                        const teamWon = $(".team-won", this).text();
                        const teamLost = $(".team:not(.team-won)", this).text();
                        const scoreWon = $(".score-won", this).text();
                        const scoreLost = $(".score-lost", this).text();
                        const eventName = $(".event-name", this).text();    
                        
                        csgo[headline].push({
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
            res.json(csgo);
        }).catch(err => console.log);
}