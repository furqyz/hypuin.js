const Discord = require(`discord.js`);

exports.run = (client, message, args) => {
 let relax_kod = args.slice(0).join(' ');
 let mbb = 'https://mc-heads.net/body/' + relax_kod
 if (relax_kod.length < 1) return message.reply('Bir oyuncu adı girer misin? \Örn: Dream');

 const relax = new Discord.MessageEmbed()
   .setColor('#ffa200')
   .setTitle('Oyuncu: ' + relax_kod)
   .setImage(mbb)
   .setFooter(`Eğer fotoğrafta steve var ise oyuncu adını yanlış girmişsinizdir.`)
 message.channel.send(relax);
 }

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
};

exports.help = {
 name: 'mcskin',
};