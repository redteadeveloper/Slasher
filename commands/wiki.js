const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'wiki',
	description: 'Search anything on Wikipedia.',
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

        const args1 = interaction.data.options[0].value.split(" ")
        const search = args1.join('_');

        const searchword = encodeURI(search)

        const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + searchword);
        const data = await res.json();

        const title = data.title;
        const text = data.extract || "Couldn't retrieve any result. Try searching case sensitively.";

        let thumbnail = data.originalimage ? data.originalimage.source : null 
        let url = data.content_urls ? data.content_urls.desktop.page : null

        const embed = new Discord.MessageEmbed()
            .setColor(`#009900`)
            .setTitle(title)
            .setURL(url)
            .setThumbnail(thumbnail)
            .setDescription(text)
            .setFooter("Powered by Wikipedia", "https://i.ibb.co/VWvCzg1/wikipedia.png")

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        embeds: [embed]
                    }
                }
            })
	},
};