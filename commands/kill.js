const { SlashCommandBuilder, userMention, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kill')
    .setDescription('Attempted murder!')
    .addUserOption(option => option.setName('target').setDescription('The member to kill')),

    async execute(interaction) {
        const giver = interaction.member
        const member = interaction.options.getMember('target');
        const responses = [
            `:knife: Your blade digs deep into ${member.user.username}!`,
            `:knife: ${member.user.username} struggles as your blade digs deep!`,
            `:bow_and_arrow: You shoot at ${member.user.username}, piercing them with an arrow!`,
            `:dagger: You stab ${member.user.username} in the back, you villainous rogue!`,
            `:axe: You swing your axe at ${member.user.username}, slicing them cleanly in half.`,
            `:knife: You lunge at ${member.user.username} but clearly misjudged the distance.`,
            `:bow_and_arrow: You're a terrible shot, shooting at everything and hitting nothing.`,
            `:axe: You drop your axe mid-swing. ${member.user.username} looks at you with absolute pity.`,
            `:dagger: You brought a knife to a bowfight! ${member.user.username} manages to takes you out with embarrassingly little effort.`
        ]
        const myMessage = responses[Math.floor(Math.random()*responses.length)]
        const color = ""
        const killEmbed = new EmbedBuilder()
            .setColor('#FF004F')
            .setTitle(`${giver.displayName} :crossed_swords: ${member.user.username}`)
            .setDescription(myMessage)
            
        return interaction.reply({ embeds: [killEmbed] });
    },
};