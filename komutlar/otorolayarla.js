const Discord = require('discord.js');
const db = require('wio.db')
exports.run = async (client, message, args) => { 
const ayarlar = require("../ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix     
let rol = message.mentions.roles.first() 
let kanal = message.mentions.channels.first()
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 
 if(!rol) return message.channel.send(`**Lütfen Bir Rol Belirt!**\n**__Örnek Kullanım__** : \`${prefix}otorol-ayarla @rol #kanal\`\n\n**__Önemli Not!!__**: **Oto Rol'u Ayarlayabilmek İçin Botun Rolü, Verilecek Rolün Üstünde Bir Rolde Olmalı Yoksa Rolü Veremez!** `)
 
 if(!kanal) return message.channel.send(`**Lütfen Bir Kanal Belirt!** \n**__Örnek Kullanım__** : \`${prefix}otorol-ayarla @Rol #Kanal\``)
 
  message.channel.send(`!rqyz Otorol
║► <a:mode:798636415487311922> Otorol Aktif Edildi.
║► <a:mode:798636415487311922>  **${rol}** Olarak Güncelledim! 
║► <a:mode:798636415487311922>  Otorol Kanalını **${kanal}** Olarak Güncelledim! `)


 
  db.set(`otoRL_${message.guild.id}`, rol.id)  
  db.set(`otoRK_${message.guild.id}`, kanal.id) 
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ['otorol-ayarla', "or"]
  };
  
  exports.help = {
    name: 'otorol-ayarla',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };