const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

global.client = client

process.on('unhandledRejection', error => {
    console.log(`UnhandledPromiseRejection : ${error}\n`)
});

client.on('ready', async () => {
    
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
        console.log(`Command POST : ${command.name} from ${file} (${command.global ? "global" : "guild"})`)
    }
    console.log("")
    
    let cmdArrGlobal = await client.api.applications(client.user.id).commands.get()
    let cmdArrGuild = await client.api.applications(client.user.id).guilds('749595288280498188').commands.get()
    cmdArrGlobal.forEach(element => {
        console.log("Global command loaded : " + element.name + " (" + element.id + ")" )
    });
    console.log("")
    cmdArrGuild.forEach(element => {
        console.log("Guild command loaded : " + element.name + " (" + element.id + ")")
    });
    console.log("")
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
