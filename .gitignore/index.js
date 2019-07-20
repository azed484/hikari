const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = ("h!");

var dispatcher;

var hasard = 0;

const { Client, RichEmbed } = require('discord.js');

client.login('[token]');

client.on('ready', () => { //ready !!
    console.log('je suis prèt mon colonel');
});

function salut(min, max){ //fonction : salut
    min = Math.ceil(0)
    max = Math.floor(4)
    hasard = Math.floor(Math.random() * (max - min +1) + min)
}

client.on("message", message => { //salut , avatar , help , profile , infobot
    if (message.content === prefix + 'salut') { 
        salut();
        if(hasard === 0){
            message.channel.send("cc toi ^^")
        }
        if(hasard === 1){
            message.channel.send("yosh (*Je sais pas si t'as la ref :/*)")
        }
        if(hasard === 2){
            message.channel.send("hey :)")
        }
        if(hasard === 3){
            message.channel.send("salut, si tu veut connaître toute les commande sur moi fait h!help ;D")
        }
        if(hasard === 4){
            message.channel.send("(*hooo djadja chuis pas ta catin dja*)...EUUH salut :sweat_smile: ")
        }
    }
    if (message.content === prefix + 'avatar') {
        message.reply(message.author.avatarURL);
    }
    if (message.content === prefix + 'help') {
        const embed = new RichEmbed()
          .setTitle('commande utilisable')
          .setThumbnail('https://img.icons8.com/bubbles/(50/000000/help.png')
          .setColor(0x00f5ff)
          .addField('h!salut', 'pour dire salut a Hikari', true)
          .addField('h!infobot', 'pour avoir des information a propos du bot',true)
          .addField('h!avatar', 'pour pouvoir voir ta magnifique photo de profil ! (et bientôt celle de tes pote)')
          .addField('h!profile', 'pour pouvoir voir ton profile')
          .addField('moderation :hammer:','`h!kick (membre)` | `h!ban (membre)` \r`h!clear (nombre entre 1 et 100)` | `h!mute (membre)`')
          .setFooter('by AzeD¹#2760','https://cdn.imgbin.com/15/25/6/imgbin-brawlhalla-fan-art-brawlhalla-tin66CTt0rKnu0PfJ9Ce7Dnew.jpg')
          .addField('musique :musical_score:', '`h!noice`')
        message.channel.send(embed);
    }
    if (message.content === prefix + 'profile') {
        const embed = new RichEmbed()
          .setTitle('carte d\'identité')
          .setDescription(message.author.tag)
          .setColor(0xffffff)
          .addField('pseudo',message.author.username)
          .setThumbnail(message.author.avatarURL)
          .addField('ID',message.author.id)
          .addField('a rejoint le serveur depuis,', message.guild.joinedAt)
          .addField('compte crée le,', message.author.createdAt)
        message.channel.send(embed);
    }
    if (message.content === prefix + 'infobot') {
        const embed = new RichEmbed()
          .setTitle('info Bot')
          .setDescription(message.client.user)
          .setThumbnail('https://cdn.discordapp.com/attachments/559380127205556234/600417832903114776/8949446b63be62db0d7d3088b1d464ff.jpg')
          .addField('ping',message.client.ping)
        message.channel.send(embed);
    }
    });

    client.on('message', function (message) { //8ball (ne marche pas)
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)

        if (!args[0].toLocaleLowerCase() === prefix + '8ball'){ //ne marche pas :/
            if (!args[1]) return message.channel.send("Veuillez **poser une question** !")
        let rep = ["Non... *désolé*", "c'est sur !", "(*ooh djadja chui pas ta catin dja...*) EUH oui certainement :sweat_smile:", "Peut être...", "Absolument","ba ché pa gro pk tu demande a moi wesh ?"]
        let reptaille = Math.floor((Math.random()* rep.length));
        let question = args.join(" ").slice(6);
        
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor("ORANGE")
            .addField("Question :", question)
            .addField("Réponse :", rep[reptaille]);
        message.channel.send(embed)
    }
});

client.on('guildMemberAdd', member => { //message de bienvenue
    const channel = member.guild.channels.find(ch => ch.name === '🏠bienvenue');r
    if (!channel) return;
    channel.send(`salut a toi ${member} ! lis le règlement avant de pouvoir t'amusé sur le serveur !`);
    });
 
client.on('ready', async () => { //status
    client.user.setStatus("online");
    client.user.setPresence({
      game: {
        name: `h!help`,
   
          }
      })
   
       })

       client.on('message', function (message) { //kick
        if (!message.guild) return
        let args = message.content.trim().split(/ +/g)
     
        if (args[0].toLowerCase() === prefix + 'kick') {
           if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
           let member = message.mentions.members.first()
           if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x")
           if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x")
           if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur ;(")
           member.kick()
           message.channel.send('**' + member.user.username + '** a été exclu !')
        }
    })

    client.on('message', function (message) { //ban
      if (!message.guild) return
      let args = message.content.trim().split(/ +/g)
   
      if (args[0].toLocaleLowerCase() === prefix + 'ban') {
         if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
         let member = message.mentions.members.first()
         if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
         if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
         if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur ;(")
         message.guild.ban(member)
         message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:')
      }
  })

  client.on('message', function (message) { //clear + mute
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(count + 1)
    }
    if (args[0].toLowerCase() === prefix + "mute") {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
      let member = message.mentions.members.first()
      if (!member) return message.channel.send("Membre introuvable")
      if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
      if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
      let muterole = message.guild.roles.find(role => role.name === 'Muted')
      if (muterole) {
          member.addRole(muterole)
          message.channel.send(member + ' a été mute :D')
      }
      else {
          message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
              message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                  channel.overwritePermissions(role, {
                      SEND_MESSAGES: false
                  })
              })
              member.addRole(role)
              message.channel.send(member + ' a été mute ;)')
          })
      }
  }
})

client.on('message', message => { //say (ne marche pas)
    if (message.content.startsWith(prefix + "say")) { //ne marche pas :/
        let args = args.join(' ').slice(1);
        message.channel.send(args);
        if (!args) return message.channel.send("Je ne trouve rien a dire.");
    }
})

client.on('message', message => { //noice
    if (!message.guild) return;
  
    if (message.content === prefix + 'noice') {
      if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { 
            const dispatcher = connection.playFile('C:/Users/jeang/OneDrive/Bureau/Mon_Bot/clicknoice.mp3');
            message.reply('j\'ai rejoint le vocal =D');
          })
          .catch(console.log);
      } else {
        message.reply('tu n\'est pas dans un salon vocal');
      }
    }
  });
