const Discord = require("discord.js");
const token = "NjQyMDkyMjI1Mzk5ODgxNzU0.Xc11GA.MI-ffNaMPCHkPjDI30MNK9bQn3c";
const prefix = ">>";
const db = require('quick.db')
const client = new Discord.Client();
const fs = require("fs");
const ownerid = "343398513369022465";
const { inspect } = require("util");
const moment = require('moment');

client.on('ready', () => {
  console.log("Bot is online i guess (BEE)")
  client.user.setActivity('>>help Making honey >>help')
  var embed = new Discord.RichEmbed()
      .setColor('#326f00')
      .setTitle("**Bee bot**")
      .addField("**Bee bot**","Im online :honey_pot:", true)
      .setTimestamp();
  client.channels.find(x => x.name === 'bot-status-logs').sendEmbed(embed);

});

client.on("message", async message => {
   const args = message.content.slice(prefix).trim().split(/ +/g);
   const command = args.shift().toLowerCase(); 
   if (message.author.bot) return;
   if(command === prefix + "setstatus"){
     if(message.author.id === ownerid){
       client.user.setActivity(args[0])
       var embed = new Discord.RichEmbed()
       .setTitle("Bee Activity")
       .setDescription("**Successfully done that job.**")
       .setColor("RANDOM")
       message.channel.sendEmbed(embed)
     }else{
       var embed = new Discord.RichEmbed()
       .setTitle("Bee Activity")
       .setDescription("**You dont have enough permissions to do that, sorry. :x:**")
       .setColor("RANDOM")
       message.channel.sendEmbed(embed)
     }
   }
   if(command === prefix + "uptime"){
       var embed = new Discord.RichEmbed()
       .setTitle("Bee Monitoring")
       .setDescription(`**Total milliseconds**\n${client.uptime}\n**Total seconds**\n${Math.floor(client.uptime/1000)}\n**Total minutes**\n${Math.floor(client.uptime/1000/60)}\n**Total hours**\n${Math.floor(client.uptime/1000 / 3600)}\n**Total days**\n${Math.floor(client.uptime/1000/86400)}`)
       .setColor("RANDOM")
       message.channel.sendEmbed(embed)
   }
   if(command === prefix){
       var embed = new Discord.RichEmbed()
       .setTitle("Bee")
       .setDescription("**Only prefix was entered, maybe u meant >>help?**")
       .setColor("RANDOM")
       message.channel.sendEmbed(embed)
   }
   if(command === prefix + "help"){
           var embed = new Discord.RichEmbed()
       .setTitle("Bee Help")
       .setDescription("**>>ping**\nDisplays current api & bot latency.\n**>>setstatus**\nSets the bot status to argument 0.\n**>>help**\nShows this message\n**>>runcmd**\nRuns the node command from discord (eval)\n**>>tag**\nDisplays information about argument 0.\n**>>new**\nCreates a new bzz ticket.\n**>>close**\nCan be only used in ticket channel (closes the ticket)\n**>>announce**\nAnnounces the message what is on argument 0.\n**>>uptime**\nDisplays uptime monitor for bee bot.")
       .setColor("RANDOM")
       message.channel.sendEmbed(embed)
   }
   if(command === prefix + "bee"){
   var embed = new Discord.RichEmbed()
       .setTitle("Bee Information")
       .setDescription("**Platform**\nNodeJS & DiscordJS\n**Developer**\n@stickman4life#8157\n**Information about me**\nIm currenctly bot in developing (Many updates are coming soon!) this bot perfectly fits\nfor a person like my owner (lazy,proffesional)")
       .setColor("RANDOM")
       message.channel.sendEmbed(embed)
   }
});

client.on('message', async message => {
    const args = message.content.slice(prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
     if(command === prefix + "ping") {
     const m = await message.channel.send("Testing ping..");
     var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Bee Latency')
        .setDescription(`**API Latency**\n${Math.round(client.ping)}ms\n**Bot Latency**\n${m.createdTimestamp - message.createdTimestamp}ms`)
        .setTimestamp();
    message.channel.sendEmbed(embed);
    m.delete(1000);
  }else{
   if(command === "ping"){
     message.channel.send("Maybe u meant >>ping?");
   } 
   if(command === prefix + "announce"){
     if (!message.member.roles.find(r => r.name === "bee.announce")) return message.reply("you dont have enough permissions!");
     var embed = new Discord.RichEmbed()
      .setColor('#326f00')
      .setTitle("**Bee announcement system**")
      .setDescription(`**Announcement by ${message.author}**\n**Message: **${args[0]}`)
      .setTimestamp();
  client.channels.find(x => x.name === 'announcements').send("<@everyone>")
  client.channels.find(x => x.name === 'announcements').sendEmbed(embed);

   }
  }
  if(command === prefix + "runcmd"){
    if (message.author.id == ownerid) {
    let toEval = args.join(" ");
    let evaluated = inspect(eval(toEval, { depth: 0} ))
    try {
       if(toEval) {
            let hrStart = process.hrtime()
            let hrDiff;
            hrDiff = process.hrtime(hrStart)
            return message.channel.send("**Successfully executed!**");
            message.delete(2000);
    
        } else {
     let dinvalidcommand = new Discord.RichEmbed()
     .setTitle("Bee Bot")
     .setColor("#e0cd3a")
     .setDescription("**That's the command, but what about args?! bzzzz** :x:");
     message.channel.send(dinvalidcommand);
  }
  } catch(e) {
     message.channel.send("Invalid command while evulating!");
  }
  }else{
     let dcp = new Discord.RichEmbed()
     .setTitle("Bee Bot")
     .setColor("#eb4034")
     .setDescription("**Sadly, you dont have enough permissions to interact with that command! bzzzz** :x:");
     message.channel.send(dcp);

  }
  }  
  if(command === prefix + "tag"){
     if (message.author.bot) return;
     let member = message.mentions.members.first() || message.member,
     user = member.user;
     if(!member) return message.reply("Unable to find " + args[0]);
     var ui = new Discord.RichEmbed()
     .setTitle(`Bee Information - ${user.id}`)
     .setColor("RANDOM")
     .setThumbnail(`${user.displayAvatarURL}`)
     .setDescription(`**UserID**\n${user.id}\n**Username**\n${user.username}\n**Status**\n${user.presence.status}\n**Profile picture**\n:arrow_upper_right:\n**Joined at**\n${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}\n**Created at**\n${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
     message.channel.send(ui)
      }
});

client.on('message', async message => {
    const args = message.content.slice(prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
   if(command === prefix + "new"){
   const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "Staff")) return message.channel.send(`'Staff' role doesnt exist. Bzz....`)
        if (message.guild.channels.exists("name", "bzz-" + message.author.id)) return message.channel.send("Bzzzz...\n:x:");
        message.guild.createChannel(`bzz-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Staff");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`Bzzzz...\n:white_check_mark:`);
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle("Bee Tickets")
                .setDescription("**Important Message**\nPlease try to explain what issue you have, support team are gonna be with you soon.")
                .setTimestamp();
            c.sendEmbed(embed);
            });
            }
            if(command === prefix + "close"){
             if (!message.channel.name.startsWith(`bzz-`)) return message.channel.send(`Bzzzz...\n:x:`);
             message.channel.delete();
            }
           
            

});

client.on("messageUpdate", async(oldMessage, newMessage) =>{
   if(oldMessage.content === newMessage.content){
      return;
   }
     var embed = new Discord.RichEmbed()
      .setColor('#326f00')
      .setTitle("Bee Logs")
      .setDescription(`**Old message**\n${oldMessage}\n**New message**\n${newMessage}\n**Message author**\n${oldMessage.author.tag}`);
  client.channels.find(x => x.name === 'bee-logs').sendEmbed(embed);
})

client.login(token);