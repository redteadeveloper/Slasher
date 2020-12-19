const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

global.client = client

process.on('unhandledRejection', error => {
    console.log(FgRed, `UnhandledPromiseRejection : ${error.name}`);
    console.log(FgMagenta, `${error.message ? error.message : "null"}`)
    console.log(FgRed, "### Extra error info ###")
    console.log(FgMagenta, `Error path : ${error.path ? error.path : "null"}`)
    console.log(FgMagenta, `Error code: ${error.code ? error.code : "null"}\n`)
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
        console.log(FgGreen, `Loaded command : ${command.name} from ${file}`, Reset)
    }

    console.log("")

});

client.ws.on('INTERACTION_CREATE', async interaction => {

    if (!client.commands.has(interaction.data.name)) return;

    try {
        client.commands.get(interaction.data.name).execute(interaction);
    } catch (error) {
        console.log(FgRed, `Error from command ${interaction.data.name} : ${error.message}`);
        console.log(FgMagenta, `${error.stack}`, Reset)
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

client.login('Nzg5NTIyMzkyNzAyNjQ4MzQ2.X9zSBw.GAfCBmd5WabTQtXQAvh6QalnrcE');

// Console colors
Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"