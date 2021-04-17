const Discord = require("discord.js"); 
exports.run = async (client, message, args) => {
  if (message.channel.type !== "text") return;
  if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Bu Komutu Kullanabilmen İçin **BAN** Yetkisine Sahip Olman Gerek!.");
  let nrcos_user = args[0];
  if (isNaN(nrcos_user)) return message.reply("Doğru ID Girmelisiniz!");
  await message.guild.members.ban(nrcos_user);
  return message.reply(`\`${nrcos_user}\` Sunucudan Banlandı!`);
}; 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["idban"]
};

exports.help = {
  name: "forceban",
  description: "ID ile Sunucudan Birisini Banlar!",
  usage: "forceban <kullanıcı-id>"
};