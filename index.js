const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)

    client.api.applications(client.user.id).guilds('749595288280498188').commands.post({data: {
        name: 'hello',
        description: 'Say hello',
    }})

    client.api.applications(client.user.id).guilds('749595288280498188').commands.post({data: {
        name: 'bye',
        description: 'Say bye',
    }})

    client.api.applications(client.user.id).guilds('749595288280498188').commands.post({data: {
        name: 'diceroll',
        description: 'Roll a dice!',
    }})

});

client.ws.on('INTERACTION_CREATE', async interaction => {
    if (interaction.data.name == 'hello') {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                    content: `Hello, <@!${interaction.member.user.id}>`
                }
            }
        })
    } else if (interaction.data.name == 'bye') {
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                    content: `Goodbye, <@!${interaction.member.user.id}>`
                }
            }
        })
    } else if (interaction.data.name == 'diceroll') {
        var facts = ["1", "2", "3", "4", "5", "6"]
        var fact = Math.floor(Math.random() * facts.length);
        let embeda = new Discord.MessageEmbed()
            .setColor("#9c51b6")
            .setTitle("Dice Roll!")
            .setDescription("Result: " + facts[fact])
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                    // content: "a",
                    embeds: [embeda]
                }
            }
        })
    }
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login('Nzg5NTIyMzkyNzAyNjQ4MzQ2.X9zSBw.GAfCBmd5WabTQtXQAvh6QalnrcE');