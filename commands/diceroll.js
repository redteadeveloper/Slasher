const Discord = require('discord.js')

module.exports = {
	name: 'diceroll',
	description: 'Roll a dice.',
	commandOptions: null,
	global: true,
	execute(interaction) {

        var facts = ["1", "2", "3", "4", "5", "6"]
        var fact = Math.floor(Math.random() * facts.length);     
        const diceembed = new Discord.MessageEmbed()
            .setColor('#00b140')
            .setTitle('Dice roll')
            .setDescription( 'Result: ' + facts[fact] )
			
		client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					embeds: [diceembed]
				}
			}
		})
	},
};