const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var guilds = require('./guilds.json');



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
});

client.on('message', message => {
   
    // If the author is NOT a bot...
      if (!message.author.bot) {
        // If the guild isn't in the JSON file yet, set it up.
        if (!guilds[message.guild.id]) guilds[message.guild.id] = { messageCount: 1, name: message.author.username,};
        // Otherwise, add one to the guild's message count.
        else guilds[message.guild.id].messageCount++;


        const messageCount = guilds[message.guild.id].messageCount;

    if(message.content == '#count'){

        message.reply('Messages sent: '+ messageCount);
        
    }
    if(message.content == '#reset'){
        guilds[message.guild.id] = { messageCount: 0};
        message.reply('Your message count has been reset Successfully!' ); 
    }

    if(message.content == '#leaderboard'){


        if(guilds[message.guild.id]){
       output = [guilds[message.guild.id]].sort( function (a, b) { 
            return b.messageCount - a.messageCount; } );}
        let lb = 'LeaderBoard:\n';
        let len = 0;
        for (var i in output){
            lb+= output[i].name + '\n';
            len++;
            if(len == 3){
                break;
            }
        
        }

        console.log(lb)
    }
       
        // message.content.valueOf(lb);

    
    

        // Write the data back to the JSON file, logging any errors to the console.
        try {
          fs.writeFileSync('./guilds.json', JSON.stringify(guilds)); // Again, path may vary.
        } catch(err) {
          console.error(err);
        }
      }

    });

client.login('ODI4NjI4NjU0NDA5OTA4MjI0.YGsWkg.75kGX0w32x9ZwWh6X0BlOKwqhAk');