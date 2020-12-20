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
	global: false,
	execute(interaction) {

        if (interaction.member.user.id !== '611396886418685982') {
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        content: "Only bot owner can use this command."
                    }
                }
            })
        }

        const evalcmd = interaction.data.options[0].value

        let evaled;
        try {
            evaled = await eval(evalcmd);
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        content: "```yaml\n" + inspect(evaled) + "\n```"
                    }
                }
            }).catch(error => {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                            content: "Result too long, check logs."
                        }
                    }
                })
            });
            console.log("-- Inspection result --\n" + inspect(evaled) + "\n------------------------");
        }
        catch (error) {
            console.error(error);
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        content: `<@!${interaction.member.user.id}>, an error occurred during evaluation.`
                    }
                }
            })
            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        content: "```" + error + "```"
                    }
                }
            }).catch(error => {
                client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                    type: 4,
                    data: {
                            content: "Error too long, check logs."
                        }
                    }
                })
            })
        }
	},
};