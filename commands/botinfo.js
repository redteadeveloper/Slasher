const Discord = require('discord.js')
const fs = require('fs');

module.exports = {
	name: 'botinfo',
	description: 'View bot info.',
	commandOptions: null,
    global: true,
	execute(interaction) {
        const ram = process.memoryUsage().heapUsed / 1024 / 1024
        const botAuthor = client.users.cache.get("611396886418685982")
        const dir = './commands';

        fs.readdir(dir, (err, files) => {
            const infoembed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Bot information')
                .setThumbnail(client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))
                .addFields(
                    { name: 'Bot name', value: 'Slasher', inline: true },
                    { name: 'Developer', value: botAuthor.tag, inline: true },
                    { name: "RAM", value: `${Math.round(ram * 100) / 100}MB`, inline: true}
                )
                .addFields(
                    { name: 'Server count', value: client.guilds.cache.size + " servers", inline: true },
                    { name: 'User count', value: client.users.cache.size + " users", inline: true},
                    { name: 'Command count', value: files.length, inline: true}
                )
                .setFooter(client.user.tag, client.user.displayAvatarURL({ size: 256, format: 'png', dynamic: true }))
                .setTimestamp()

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