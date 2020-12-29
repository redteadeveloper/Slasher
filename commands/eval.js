const Discord = require('discord.js')
const { inspect } = require('util');

module.exports = {
	name: 'eval',
	description: 'Executes JavaScript code.',
	commandOptions: [
		{
			type: 3,
            name: "code",
            description: "Code to execute",
            required: true
		}
    ],
	global: true,
	async execute(interaction) {

        if (interaction.member.user.id !== '611396886418685982') {
             return client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        content: `<@!${interaction.member.user.id}>, only bot owner can use this command.`
                    }
                }
            })
        }

        const evalcmd = interaction.data.options[0].value

        let evaled;
        try {
            evaled = await eval(`if (1>0) { ${evalcmd} }`);
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        content: `<@!${interaction.member.user.id}>, evaluation complete. Check logs.`
                    }
                }
            })
            console.log("-- Inspection result --\n" + inspect(evaled) + "\n------------------------\n");
        } catch (error) {
            console.error("-- Inspection result --\n" + error + "\n------------------------\n");
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        content: `<@!${interaction.member.user.id}>, an error occurred during evaluation. Check logs.`
                    }
                }
            })
        }
	},
};
