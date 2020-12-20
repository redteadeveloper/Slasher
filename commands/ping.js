module.exports = {
	name: 'ping',
	description: 'Ping!',
	commandOptions: null,
	global: true,
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