module.exports = {
	name: 'errortest',
	description: 'error test',
	execute(interaction) {
		client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					content: null
				}
			}
		})
	},
};