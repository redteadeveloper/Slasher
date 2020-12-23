const Discord = require('discord.js')
const gis = require("g-i-s")

module.exports = {
	name: 'imgsearch',
	description: 'Search for an image on Google.',
	commandOptions: [
		{
			type: 3,
            name: "search-query",
            description: "String to search",
            required: true
		}
    ],
	global: true,
	async execute(interaction) {

        function checkURL(url) {
            return(String(url).match(/\.(jpeg|jpg|gif|png)$/) != null);
        }
    
        const search = interaction.data.options[0].value
    
        var opts = {
            searchTerm: search,
            queryStringAddition: '&safe=strict'
        };
    
        gis(opts, logResults);
    
        function logResults(error, results) {
            if (error) {
                console.log(error);
                msg.channel.send("An error occurred.")
            } else {
    
                if(!results[0]) {
                    const resultembedn = new Discord.MessageEmbed()
                        .setColor("#00b140")
                        .setTitle("Not found.")
                        .setDescription("Couldn't retrieve any result.")

                    return client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                        type: 4,
                        data: {
                                embeds: [resultembedn]
                            }
                        }
                    })
                }
    
                let img
    
                for(var i = 0; i < results.length; i++) {
                    var num = Math.floor(Math.random() * results.length);
                    if (checkURL(results[num].url) == true) {
                        img = results[num].url
                        break
                    }
                }
    
                const resultembed = new Discord.MessageEmbed()
                    .setColor("#00b140")
                    .setTitle(`Search result - ${search}`)
                    .setImage(img)
                    .setFooter("If the image doesn't load, search again.")
    
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                            embeds: [resultembed]
                        }
                    }
                })
            }
        }
	},
};