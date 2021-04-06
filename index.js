const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var guilds = require('./guilds.json');
const config = require('./config.json');




client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
});

client.on('message', message => {
   
    // If the guild is NOT a bot...
      if (!message.author.bot) {
        // If the guild isn't in the JSON file yet, set it up.
        if (!guilds[message.author.id + message.guild.id]){ guilds[message.author.id + message.guild.id] = { messageCount: 1, name: message.guild.member(message.author).displayName, server: message.guild.id};}
        // Otherwise, add one to the guild's message count.
        else {guilds[message.author.id + message.guild.id].messageCount++;}
      
  
    
      const messageCount = guilds[message.author.id + message.guild.id].messageCount;

    if(message.content == '!count'){

        message.reply('Messages sent: '+ messageCount);
        
    }
    if(message.content == '!reset'){
        guilds[message.author.id + message.guild.id] = { messageCount: 0, name: message.guild.member(message.author).displayName, server: message.guild.id};
        message.reply('Your message count has been reset Successfully!' ); 
    }

    if(message.content == '!leaderboard'){
      var output =[];

       var user = Object.keys(guilds).map(key => {
        return guilds[key];})

        for(var i in user){
        if(user[i].server ==  message.guild.id){
          output.push(user[i]);
          
        }}
        
        output.sort(function(a, b){
              return b.messageCount - a.messageCount;})


        let lb = 'LeaderBoard:\n';
        let len = 0;
        for (var i in output){
            lb+= output[i].name + ': '+ output[i].messageCount + '\n';
            len++;
            if(len == 3){
                break;
            }
        
        }

        message.channel.send(lb)
    }


        // Write the data back to the JSON file, logging any errors to the console.
        try {
          fs.writeFileSync('./guilds.json', JSON.stringify(guilds)); 
        } catch(err) {
          console.error(err);
        }
      }

    });

client.login(config.token);