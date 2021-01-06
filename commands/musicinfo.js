const Discord = require("discord.js")
const musicInfo = require("music-info")

module.exports = {
	name: 'ping',
	description: 'Ping!',
	commandOptions: [
		{
			type: 3,
            name: "title",
            description: "Title of the song",
            required: true
        },
        {
			type: 3,
            name: "artist",
            description: "Artist of the song",
            required: false
        },
        {
			type: 3,
            name: "album",
            description: "Album of the song",
            required: false
		}
    ],
	global: false,
	execute(interaction) {

        const title = interaction.data.options[0].value
        const artist = interaction.data.options[1].value ? interaction.data.options[1].value : null
        const album = interaction.data.options[2].value ? interaction.data.options[2].value : null

        musicInfo.searchSong({ title: title, artist: artist, album: album }).then(res => {

            const musicEmbed = new Discord.MessageEmbed()
                .setColor("#00b140")
                .setTitle(`About ${res.title} :notes:`)
                .addFields(
                    { name: 'Title', value: res.title, inline: true },
                    { name: 'Artist', value: res.artist, inline: true },
                    { name: 'Album', value: res.album, inline: true },
                )
                .addFields(
                    { name: 'Disc number', value: res.discNumber, inline: true},
                    { name: 'Track number', value: res.trackNumber, inline: true },
                    { name: 'Explicit', value: res.explicit, inline: true },
                )
                .addFields(
                    { name: 'Genre', value: res.genre, inline: true},
                    { name: 'Release date', value: res.releaseDate.split("T")[0], inline: true },
                )
                .setFooter("Release date may be inaccurate.")

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        embeds: [musicEmbed]
                    }
                }
            })
        })
	},
};