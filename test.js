const { default: axios } = require("axios");
const path = require('node:path');
const fs = require('node:fs');
const { uid } = require("./src/utils/uid");
const { req } = require("./src/utils/fetchApi");

async function execute() {
  try {
    const response = await req({
      base: 'stableDiff',
      uri: 'api/v4/dreambooth/fetch',
      method: 'POST',
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        "key": "wBJ30FC6yyUnMlpe5O3ZQFGiqPXbhLJ8bMscXUrV8auxz0Nt8gY6mmVXb2jl",
        "request_id": 56988582
      }
    })
    const { data: { output } } = response;
    if (response.data.status === 'success') {
      if (output[0].endsWith('.base64')) {
        const raw = await req({
          fullUrl: output[0],
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const { data: base } = raw;
        const image = Buffer.from(base, 'base64');
        const attacment = new AttachmentBuilder(image, { name: 'image.png' });
        return await interaction.editReply({
          content: `Result of id: 8932483274`,
          files: [attacment],
        });
      }
      else return await interaction.editReply({
        content: `Result of id: 8932483274`,
        files: [attacment],
      });
    }
    else if (response.data.status === 'pending') {
      return await interaction.editReply({
        content: `Still pending`,
      });
    }
    return await interaction.editReply({
      content: `Result: Bot is confused!`
    });
  } catch (err) {
    console.log({ err })
  }
}

(async () => execute())()