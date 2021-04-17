
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const db = require('wio.db')

var prefix = ayarlar.prefix;

const log = message => {
	console.log(`${message}`);
};
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;
  process.on('warning', function (err) {
	if ( 'MaxListenersExceededWarning' == err.name ) {
	process.exit(1); 

	}
  });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
	if (err) console.error(err);
	log(`${files.length} komut yüklenecek.`);
	files.forEach(f => {
		let props = require(`./komutlar/${f}`);
		log(`Yüklenen komut: ${props.help.name}.`);
		client.commands.set(props.help.name, props);
		props.conf.aliases.forEach(alias => {
			client.aliases.set(alias, props.help.name);
		});
	});
});


client.reload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./komutlar/${command}`)];
			let cmd = require(`./komutlar/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};

client.load = command => {
	return new Promise((resolve, reject) => {
		try {
			let cmd = require(`./komutlar/${command}`);
			client.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				client.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};


client.unload = command => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./komutlar/${command}`)];
			let cmd = require(`./komutlar/${command}`);
			client.commands.delete(command);
			client.aliases.forEach((cmd, alias) => {
				if (cmd === command) client.aliases.delete(alias);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};
 
client.elevation = message => {
	if (!message.guild) {
		return;
	}
	let permlvl = 0;
	if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
	if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
	if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
	if (message.author.id === ayarlar.sahip) permlvl = 4;
	return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
	console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
	console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

////////YAZI YAZINCA CEVAP VERME/////////


client.on("message", msg => {
  const westrabumbe = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(
      '**Kullanım Prefixim:**    `r!`\n**Yardım Menüm:** `r!yardım`\n**Destek Yardım:**   `r!bot`'
    );
  if (
    msg.content.includes(`<@${client.user.id}>`) ||
    msg.content.includes(`<@!${client.user.id}>`)
  ) {
    msg.channel.send(westrabumbe);
  }
});


  //otoorol
client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;

  if (!mesaj) {
    client.channels.cache
      .get(kanal)
      .send(
        "<a:ggg:799375681267826748> " +
          member.user.tag +
          " ***Hoş Geldin! Otomatik Rolün Verildi Seninle Beraber*** " +
          member.guild.memberCount +
          "** *Kişiyiz!***"
      );
    return member.roles.add(rol);
  }
  

  if (mesaj) {
    var mesajs = mesaj
      .replace("-uye-", `${member.user}`)
      .replace("-uyetag-", `${member.user.tag}`)

      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.cache.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`);
    member.roles.add(rol);
    
  }
});