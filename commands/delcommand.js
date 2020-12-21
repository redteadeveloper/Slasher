const Discord = require('discord.js')
const http = require('http')

module.exports = {
	name: 'delcommand',
	description: 'Deletes guild/global application commands.',
	commandOptions: [
		{
			type: 3,
            name: "guild-id",
            description: "Not required for global commands.",
            required: false
		}
    ],
	global: false,
	execute(interaction) {

        var optionsGet = {
            hostname: 'discord.com',
            path: '/api/applications/789522392702648346/commands',
            method: 'GET',
            headers: {
                "Authorization": process.env.TOKEN
            }
        };
           
        var reqGet = http.request(optionsGet, function(res) {
            console.log('Status: ' + res.statusCode)
            console.log('Headers: ' + JSON.stringify(res.headers))
            res.setEncoding('utf8')
            res.on('data', function (body) {
                console.log('Body: ' + body)
            });
            console.log("")
        });

        reqGet.on('error', function(e) {
            console.log('problem with request: ' + e.message)
            console.log("")
        });

        reqGet.end();

        // const guildId = interaction.data.options[0].value
        // let reqPath

        // Global: https://discord.com/api/v8/applications/<my_application_id>/commands/<command_id>
        // Guild: https://discord.com/api/v8/applications/<my_application_id>/guilds/<guild_id>/commands/<command_id>

        // if (!guildId) {
        //     reqPath = `/api/v8/applications/789522392702648346/commands/<command_id>`
        // } else {
        //     reqPath = `/api/v8/applications/789522392702648346/guilds/${guildId}/commands/<command_id>`
        // }

        // var options = {
        //     hostname: 'discord.com',
        //     path: reqPath,
        //     method: 'DELETE',
        //     headers: {
        //         "Authorization": process.env.TOKEN
        //     }
        // };
           
        // var req = http.request(options, function(res) {
        //     console.log('Status: ' + res.statusCode)
        //     console.log('Headers: ' + JSON.stringify(res.headers))
        //     res.setEncoding('utf8')
        //     res.on('data', function (body) {
        //         console.log('Body: ' + body)
        //     });
        //     console.log("")
        // });

        // req.on('error', function(e) {
        //     console.log('problem with request: ' + e.message)
        //     console.log("")
        // });

        // req.end();
          
	},
};