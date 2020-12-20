const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
	name: '8ball',
	description: 'Ask the bot a question.',
	commandOptions: null,
    global: false,
	execute(interaction) {
        const ram = process.memoryUsage().heapUsed / 1024 / 1024
        const botAuthor = client.users.cache.get("602011789408075777")
        const dir = '.';

        fs.readdir(dir, (err, files) => {
            const infoembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Bot information')
                .setThumbnail(client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))
                .addFields(
                    { name: 'Bot name', value: 'Slasher', inline: true },
                    { name: 'Developer', value: botAuthor.tag, inline: true },
                    { name: 'Command count', value: files.length, inline: true}
                )
                .addFields(
                    { name: 'Server count', value: client.guilds.cache.size + " servers", inline: true },
                    { name: 'User count', value: client.users.cache.size + " users", inline: true},
                    { name: "RAM", value: `${Math.round(ram * 100) / 100}MB`, inline: true}
                )
                .setFooter(client.user.tag, client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        embeds: [infoembed]
                    }
                }
            })
        });
	},
};