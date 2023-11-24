const fs = require('node:fs');
const path = require('node:path');
const { Collection, REST, Routes } = require('discord.js');

async function loadCommands(client) {

  try {
    const foldersPath = path.join(process.cwd(), 'src', 'commands');
    const files = fs.readdirSync(foldersPath);
    const jsFiles = files.filter((file) => file.endsWith('.js'));
    client.commands = new Collection();
    const commands = [];
    jsFiles.forEach((ech) => {
      const filePath = path.join(foldersPath, ech);
      const vals = require(filePath);
      if ('data' in vals && 'execute' in vals) {
        commands.push(vals.data.toJSON());
        return client.commands.set(vals.data.name, vals);
      }
      return console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    });
    console.log('[+] Command registered!');

    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    const data = await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: commands });

    if (!data) return console.log('[+] Error while registering command in client side');
    return console.log('[+] Command registered in client side');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  loadCommands
}