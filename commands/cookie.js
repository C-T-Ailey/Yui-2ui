const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');
const fs = require('fs')

// Initialize cookieStats as an empty object
var cookieStats = {}

module.exports = {
    // Slash command params
	data: new SlashCommandBuilder()
    .setName('cookie')
    .setDescription('Give the greatest gift of all.')
    .addUserOption(option => option.setName('target').setDescription('Who will receive your delicious token of affection?')),
    
    async execute(interaction) {
        
        const giver = interaction.member
        const victim = interaction.options.getMember('target');

        // key for storing the value of a user's received cookies; corresponds to that user's ID
        const key = victim.user.id
        
        // read the cookieStats.json file from commands directory
        fs.readFile('./commands/cookieStats.json', 'utf8', function readFileCallback(err, data) {
            if (err){

                console.log("Read error:", err)

            } else {
                
                // Parse the JSON file to object and store as cookieStats
                cookieStats = JSON.parse(data)
        
                console.log("======== NEW COOKIE ========")
        
                console.log("current cookie user stats =", cookieStats)
        
                // If cookieStats has a property corresponding to key/receiver ID:
                if (cookieStats.hasOwnProperty(key)) {
                    console.log("User already exists. Good job!")
                    console.log("User's cookie count:", cookieStats[key])
                    // Then try:
                    try {
                        console.log("user ID to use as key =", key)
                        
                        // increment the receiver's cookie count by 1
                        cookieStats[key] += 1
                        console.log(`That's ${cookieStats[key]} cookies!`)

                    // But if there's an error...
                    } catch (error) {
                        console.error(error)
                        console.log("Whoops.")
                    }
                    
                    
                // Otherwise, if the user doesn't exist in cookieStats yet:
                } else {
                    console.log("That ID isn't here!")

                    // Create a property in cookieStats corresponding to key/receiver ID, value set to 1
                    cookieStats = {...cookieStats, [key]:1}
                    console.log(cookieStats)
                    console.log(`New user (${key}) created!`)
                }
                
                // Stringify the updated cookieStats object
                var stringifiedCookies = JSON.stringify(cookieStats);
                console.log(stringifiedCookies)
                // Write the stringified object to cookieStats.json
                fs.writeFile('./commands/cookieStats.json', stringifiedCookies, (err, result) => { if(err) console.log('Encountered error:', err) });
                
                
                let cookieImg = undefined
                
                // Define the message for the embed description
                const myMessage = `${giver} gave a cookie to ${userMention(victim.user.id)}! That's ${cookieStats[key]} cookies you've received now!`
                
                // Define the sent embed
                const cookieEmbed = new EmbedBuilder()
                    .setColor('#FF004F')
                    .setTitle(`Cookie!`)
                    .setDescription(myMessage)
                    // .setImage()
        
                console.log(cookieStats)
        
                // Send the completed embed
                return interaction.reply({ embeds: [cookieEmbed] });
                
            }
        })
        

    },
};