// This is an in-joke within the server I built this bot for, purely a test command.

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tonfa')
        .setDescription('Reminds you where tonfa belong.'),
    async execute(interaction) {
        return interaction.reply(':wastebasket:');
    },
};