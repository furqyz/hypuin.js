const Discord = require('discord.js');

exports.run = function(client, message) {
const embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle('!rqyz Otorol Ayarlama Menüsü')
.addField('<a:mode:798636415487311922> r!otorol-ayarla', 'Otorol sistemini aktif edebilirsiniz.')
.addField('<a:mode:798636415487311922> r!otorol-kapat', 'Otorol sistemini kapatırsınız.')
.setImage("https://media.giphy.com/media/ZkGVnIVxkMBGnqvuJP/giphy.gif")
.setFooter("@2020 !rqyz", client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setTimestamp()
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["otorol","otorolyardım"], 
  permLevel: 0 
};

exports.help = {
  name: 'otorolhelp',
  description: 'Tüm komutları gösterir.',
  usage: 'aboneyardım'
};
