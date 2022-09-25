const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with your user info!'),
    async execute(interaction) {
        return interaction.reply(`Your tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`);
    }
}