const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token
const moment = require("moment");
require("moment-duration-format");
const welcomeChannelName = "🎉ㅣ안녕하세요";
const byeChannelName = "🎉ㅣ안녕히가세요";
const welcomeChannelComment = "저희서버에 오신걸 환영합니다";
const byeChannelComment = "퇴장하셨습니다";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: '#help2를 쳐보세요.' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "유저🔗"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});
client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  } 

  if(message.content == '!si') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/attachments/737597103953543188/744914139931213884/1_25.png';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], M [분], S [초]");
    embed.setColor('#186de6')
    embed.setAuthor('파이리봇 서버상태', img)
    embed.setFooter('개발자:파이리812#1482')
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }


  if(message.content == '#help') {
    let img = 'https://cdn.discordapp.com/attachments/737597103953543188/744914139931213884/1_25.png';
    let embed = new Discord.RichEmbed()
      .setTitle('소개')
      .setURL('http://www.naver.com')
      .setAuthor('파이리', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('봇 개발자:파이리812#1482', '이분는 디스코드서버제작신청받고있으니 아래 디코링크타서 서버에 들어오세요')
      .addField('https://www.youtube.com/channel/UC4O_wPMfPLpusyEk1I8_02A/videos?view_as=subscriber', '파이리님의 유튜브링크입니다 구독하시면 큰힘이 됩니다', true)
      .addField('https://discord.gg/rehngY6', '파이리님의 디코제작샵', true)
      .addField('https://discord.gg/RhANapM', '파이리님의 팬디스코드', true)
      .addField('https://discord.gg/rRWjvje', '파이리님의 gta5핵대리샵', true)
      .addField('디스코드 서버제작강의 해드립니다', '무료로강의 해드립니다\n강의신청은 디코제작샵아니면\팬디스코드에서 신청가능합니다\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('개발자:파이리812#1482', img)

    message.channel.send(embed)
  } else if(message.content == '#help2') {
    let helpImg = 'https://cdn.discordapp.com/attachments/737597103953543188/744914139931213884/1_25.png';
    let commandList = [
      {name: 'ping', desc: 'pong'},
      {name: '#help', desc: '봇의 대해 소개시켜줍니다'},
      {name: '#help2', desc: '명령어를 알려줍니다'},
      {name: '#DM', desc: 'DM공지(관리자권한들어가있는사람만 가능)'},
      {name: '!청소 (1~100)', desc: '메세지를 대량 삭제할수있습니다'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Prairie 봇 명령어', helpImg)
      .setColor('#186de6')
      .setFooter(`개발자:파이리812#1482`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);
  
    message.channel.send(embed)
  } else if(message.content == '!초대코드') {
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
    .then(invite => {
      message.channel.send(invite.url)
    });
  }

  if(message.content.startsWith('#DM')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('#DM'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('모두에게 DM이 보내졌습니다');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }

  if(message.content.startsWith('!청소')) {
    if(checkPermission(message)) return

    var clearLine = message.content.slice('!청소 '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        const _limit = 10;
        let _cnt = 0;

        message.channel.fetchMessages({limit: _limit}).then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});




function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);