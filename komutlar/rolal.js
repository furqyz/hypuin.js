const db = require('wio.db');

const Discord = require('discord.js')
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(`Bu Komutu Kullanabilmek İçin "\`Yönetici\`" Yetkisine Sahip Olmalısın.`);
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);
    let role = message.mentions.roles.first();
    if(!user) return message.channel.send("Bir Kişiyi Etiketlemelisin.")
    if(!role) return message.channel.send("Bir Role Etiketlemelisin")
    if(user.roles.cache.has(role.id)) return message.channel.send("Bu kullanıcı zaten bu role sahip")
    user.roles.add(role).catch(error => {

                       message.channel.send(`Bir Hata Oluştu.`);
                      console.log(`hata`)
                   });
  message.channel.send("Rol Başarıyla Verildi").then(msg => msg.delete({timeout: 5000}))
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolver'],
  permLevel: 0
};

exports.help = {
  name: 'rol-ver',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'js'
};