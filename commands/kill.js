const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Attempted murder!')
    .addUserOption(option => option.setName('target').setDescription('The member to kill')),
async execute(interaction) {
    const member = interaction.options.getMember('target');
    const myMessage = `You sent 2ui to murder ${userMention(member.user.id)}, but she's too weak to finish the job at the moment!`
    const killEmbed = new EmbedBuilder()
        .setColor('#FF004F')
        .setTitle(`Attempting to kill ${member.user.username}...`)
        .setDescription(myMessage)
    return interaction.reply({ embeds: [killEmbed] });
	},
};