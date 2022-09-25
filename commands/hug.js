const axios = require('axios')
const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');
const { kawaiiToken } = require("../config.json")


module.exports = {
	data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Try a little tenderness.')
    .addUserOption(option => option.setName('target').setDescription('The member to hug!')),
async execute(interaction) {
    const hugger = interaction.member
    const victim = interaction.options.getMember('target');
    let hugGif = undefined
    await axios.get(`https://kawaii.red/api/gif/hug/token=${kawaiiToken}`)
    .then(response => {
        hugGif = response.data.response
        console.log(hugGif)
    })
    .catch(error => {
        console.error(error)
    })
    const myMessage = `${hugger} hugged ${userMention(victim.user.id)}!`
    const hugEmbed = new EmbedBuilder()
        .setColor('#FF004F')
        .setTitle(`Hugs!`)
        .setDescription(myMessage)
        .setImage(hugGif)
    return interaction.reply({ embeds: [hugEmbed] });
	},
};