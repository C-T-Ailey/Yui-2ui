const axios = require('axios')
const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');
const { kawaiiToken } = require("../config.json")


module.exports = {
	data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('What did the five fingers say to the face?')
    .addUserOption(option => option.setName('target').setDescription('The member to slap!')),
async execute(interaction) {
    const slapper = interaction.member
    const victim = interaction.options.getMember('target');
    let slapGif = undefined
    await axios.get(`https://kawaii.red/api/gif/slap/token=${kawaiiToken}`)
    .then(response => {
        slapGif = response.data.response
        console.log(slapGif)
    })
    .catch(error => {
        console.error(error)
    })
    const myMessage = `${slapper} slapped ${userMention(victim.user.id)}!`
    const slapEmbed = new EmbedBuilder()
        .setColor('#FF004F')
        .setTitle(`Slap!`)
        .setDescription(myMessage)
        .setImage(slapGif)
    return interaction.reply({ embeds: [slapEmbed] });
	},
};