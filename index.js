const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

global.client = client

process.on('unhandledRejection', error => {
    console.log(`UnhandledPromiseRejection : ${error}`)
});

client.on('ready', () => {
    
    console.log(`\nLogged in : ${client.user.tag}\n`)
    client.user.setActivity(`Slash!`, { type: "PLAYING" })
        .then((presense) => console.log(`Set presense : ${presense.activities[0]}\n`))
        .catch(console.error);

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.api.applications(client.user.id).guilds('749595288280498188').commands.post({ data: {
            name: command.name,
            description: command.description,
            options: command.commandOptions
        }})
        if (command.global == true) {
            client.api.applications(client.user.id).commands.post({ data: {
                name: command.name,
                description: command.description,
                options: command.commandOptions
            }})
        }
        client.commands.set(command.name, command);
        console.log(`Loaded command : ${command.name} from ${file} (status: ${command.global ? "global" : "private"})`)
    }
    console.log("")

    let cmdArr = client.api.applications(client.user.id).commands.get()
    console.log(cmdArr + "\n")

});

client.ws.on('INTERACTION_CREATE', async interaction => {

    if (!client.commands.has(interaction.data.name)) return;

    try {
        client.commands.get(interaction.data.name).execute(interaction);
    } catch (error) {
        console.log(`Error from command ${interaction.data.name} : ${error.message}`);
        console.log(`${error.stack}\n`)
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
			type: 4,
			data: {
					content: `Sorry, there was an error executing that command!`
				}
			}
		})
    }
    
})

client.login(process.env.TOKEN);