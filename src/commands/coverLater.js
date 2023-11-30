const { SlashCommandBuilder, userMention, AttachmentBuilder } = require("discord.js");
const { req } = require("../utils/fetchApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coverlater')
    .setDescription('this is chatGPT to make your cover later')
    .addStringOption((option) =>
      option.setName('name')
        .setDescription('write your name here.')
        .setRequired(true))
    .addStringOption((option) =>
      option.setName('description')
        .setDescription('write job description here.')
        .setRequired(true)
        .setMaxLength(6000))
    .addStringOption((option) =>
      option.setName('skill_among_requirements')
        .setDescription('What skills do you have among the skill requirements of this job?')
        .setRequired(true)
        .setMaxLength(6000))
    .addStringOption((option) =>
      option.setName('job_title')
        .setDescription('write the job title here.')
        .setRequired(false)
        .setMaxLength(200))
  ,
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    try {
      const name = await interaction.options.getString('name');
      const description = await interaction.options.getString('description');
      const skills = await interaction.options.getString('skill_among_requirements');
      const jobTitle = await interaction.options.getString('job_title') || `[Job Title]`;
      const response = await req({
        base: 'openAi',
        uri: 'v1/chat/completions',
        method: 'POST',
        withCredentials: false,
        data: {
          model: "gpt-3.5-turbo",
          messages: [{
            "role": "system",
            "content": `
            Job Title: ${jobTitle},
            Job Description: ${description},
            Applicant Name: ${name},
            Applicant skills: ${skills},

            Generate a compelling cover letter for ${name} applying for the ${jobTitle} position.
             Highlight their relevant skills, experiences, and achievements that align with the requirements outlined in the job description.
             Ensure the cover letter is tailored to showcase ${name}'s suitability for the role and their ability to contribute effectively to the company.
             `
          }],
        }
      });
      const { data } = response;
      const reply = data.choices[0].message.content;

      const user = userMention(interaction.user.id);
      const buffer = Buffer.from(reply, 'utf-8');

      const attacment = new AttachmentBuilder(buffer, { name: `${name}-coverlater.txt` });
      return await interaction.editReply({
        content: `${user}`,
        files: [attacment],
        ephemeral: true
      });

    } catch (err) {
      await interaction.editReply({ content: 'An error occurred while processing the command.', ephemeral: true });
      console.log({ err });
    }
  }
}