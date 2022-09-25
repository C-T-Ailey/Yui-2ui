const axios = require('axios')
const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');
const { kawaiiToken } = require("../config.json")


module.exports = {
	data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Kissy kissy!.')
    .addUserOption(option => option.setName('target').setDescription('The member to kiss!')),
async execute(interaction) {
    const kisser = interaction.member
    const victim = interaction.options.getMember('target');
    let kissGif = undefined
    await axios.get(`https://kawaii.red/api/gif/kiss/token=${kawaiiToken}`)
    .then(response => {
        kissGif = response.data.response
        console.log(kissGif)
    })
    .catch(error => {
        console.error(error)
    })
    const myMessage = `${kisser} kissed ${userMention(victim.user.id)}!`
    const kissEmbed = new EmbedBuilder()
        .setColor('#FF004F')
        .setTitle(`Kisses!`)
        .setDescription(myMessage)
        .setImage(kissGif)
    return interaction.reply({ embeds: [kissEmbed] });
	},
};