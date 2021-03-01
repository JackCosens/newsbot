const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config");
const mysql = require("mysql");

const client = new Discord.Client();

// Registration of custom handlers
const embed = require("./utils/embed")
const setup = require("./utils/complete_setup")
const article = require("./utils/article")

client.embed = embed(client);
client.setup = setup(client);
client.post = article(client);

// Passthrough the config and mysql connection to client structure
client.config = config;
client.con = mysql.createConnection(client.config.mysql_dev);
client.con.connect();

// Modular Commands
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const command = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, command);
  });
});

// Creating moduled events
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.login(client.config.bot.token).then(r => console.log("Bot is logged in!"));
