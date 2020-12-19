const Discord = require('discord.js')

module.exports = {
	name: 'diceroll',
	description: 'Roll a dice.',
	commandOptions: null,
	execute(interaction) {
        var facts = ["1", "2", "3", "4", "5", "6"]
        var fact = Math.floor(Math.random() * facts.length);     
        const diceembed = new Discord.MessageEmbed()
            .setColor('#9c51b6')
            .setTitle('Coin flip')
            .setDescription( 'Result: ' + facts[fact] )
            .setTimestamp()
		client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					embeds: [diceembed]
				}
			}
		})
	},
};