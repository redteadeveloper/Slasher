const Discord = require('discord.js')

module.exports = {
	name: '8ball',
	description: 'Ask the bot a question.',
	commandOptions: [
		{
			type: 3,
            name: "question",
            description: "Question to ask",
            required: true
		}
	],
	execute(interaction) {
        var answers = [
            "Yes.",
            "Ask me later.", 
            "No.", 
            "I don't know",
            "Of course.",
            "Never.", 
            "Maybe.",
            "Hmm...",
            "Excuse me?"];

        var answer = Math.floor(Math.random() * answers.length);
 
        const ballembed = new Discord.MessageEmbed()
            .setColor('#9c51b6')
            .setTitle('**8ball**')
            .setDescription( '**Your question**: ' + interaction.data.options[0].value + '\n**My answer**: ' + answers[answer] )
            .setTimestamp() 

		client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					embeds: [ballembed]
				}
			}
		})
	},
};