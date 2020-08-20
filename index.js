const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token
const welcomeChannelName = "🎉ㅣ안녕하세요";
const byeChannelName = "🎉ㅣ안녕히가세요";
const welcomeChannelComment = "저희서버에 오신걸 환영합니다";
const byeChannelComment = "퇴장하셨습니다";

client.on('ready', () => {
  console.log('켰다.');
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


client.login(token);