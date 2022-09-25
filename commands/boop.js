const axios = require('axios')
const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');
const { kawaiiToken } = require("../config.json")


module.exports = {
	data: new SlashCommandBuilder()
    .setName('boop')
    .setDescription('Boop!')
    .addUserOption(option => option.setName('target').setDescription('The member to boop!')),
async execute(interaction) {
    const booper = interaction.member
    const victim = interaction.options.getMember('target');
    let boopGif = undefined
    await axios.get(`https://kawaii.red/api/gif/boop/token=${kawaiiToken}`)
    .then(response => {
        boopGif = response.data.response
        console.log(boopGif)
    })
    .catch(error => {
        console.error(error)
    })
    const myMessage = `${booper} booped ${userMention(victim.user.id)}!`
    const boopEmbed = new EmbedBuilder()
        .setColor('#FF004F')
        .setTitle(`Boop!`)
        .setDescription(myMessage)
        .setImage(boopGif)
    return interaction.reply({ embeds: [boopEmbed] });
	},
};