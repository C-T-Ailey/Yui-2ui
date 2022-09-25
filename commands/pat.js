const axios = require('axios')
const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');
const { kawaiiToken } = require("../config.json")


module.exports = {
	data: new SlashCommandBuilder()
    .setName('pat')
    .setDescription('Try a little tenderness.')
    .addUserOption(option => option.setName('target').setDescription('The member to pat!')),
async execute(interaction) {
    const patter = interaction.member
    const victim = interaction.options.getMember('target');
    let patGif = undefined
    await axios.get(`https://kawaii.red/api/gif/pat/token=${kawaiiToken}`)
    .then(response => {
        patGif = response.data.response
        console.log(patGif)
    })
    .catch(error => {
        console.error(error)
    })
    const myMessage = `${patter} patted ${userMention(victim.user.id)}!`
    const patEmbed = new EmbedBuilder()
        .setColor('#FF004F')
        .setTitle(`Pats!`)
        .setDescription(myMessage)
        .setImage(patGif)
    return interaction.reply({ embeds: [patEmbed] });
	},
};