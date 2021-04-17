const Discord = require('discord.js');
exports.run = function(client, message, args) {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
    const çekiliş = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
    .setTitle("Çekiliş!", true)
    .addField("Çekilişi Yapan:", `<@${message.author.id}>`, true)
    .addField("Çekilişin Yapıldığı Kanal:", message.channel)
    .addField("Çekilişin Yapıldığı Zaman:", message.createdAt)
    .addField(`Çekilişi Kazanan:`, `<@${message.guild.members.cache.random().id}>`, true)
    .setColor("RANDOM")
    .setDescription('')
    return message.channel.send(çekiliş);
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["çekilişyap"],
  permLevel: 0
};

exports.help = {
  name: 'hızlıçek',
  description: 'Çekiliş yapar.',
  usage: 'çekilişyap'
};