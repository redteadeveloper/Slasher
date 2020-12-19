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
		client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					content: `:ping_pong: Pong: ${client.ws.ping}ms!`
				}
			}
		})
	},
};