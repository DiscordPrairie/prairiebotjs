const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzQ1MjE1ODk3NTkzMDUzMjY0.XzuiYw.u165NROyIxJOvTtMqJCtZygSu0Q';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);