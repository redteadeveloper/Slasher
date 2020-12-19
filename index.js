const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

global.client = client

process.on('unhandledRejection', error => {
    console.log(`UnhandledPromiseRejection : ${error.name}`);
    console.log(`${error.message ? error.message : "null"}`)
    console.log("### Extra error info ###")
    console.log(`Error path : ${error.path ? error.path : "null"}`)
    console.log(`Error code: ${error.code ? error.code : "null"}\n`)
});

client.on('ready', () => {
    
    console.log(`\nLogged in as ${client.user.tag}!\n`)

    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.api.applications(client.user.id).guilds('749595288280498188').commands.post({data: {
            name: command.name,
            description: command.description,
        }})
        client.commands.set(command.name, command);
        console.log(`Loaded command : ${command.name} from ${file}`)
    }

    console.log("")

});

client.ws.on('INTERACTION_CREATE', async interaction => {

    if (!client.commands.has(interaction.data.name)) return;

    try {
        client.commands.get(interaction.data.name).execute(interaction);
    } catch (error) {
        console.log(`Error from command ${interaction.data.name} : ${error.message}`);
        console.log(`${error.stack}`)
        console.log("")
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