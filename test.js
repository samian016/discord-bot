const { default: axios } = require("axios");
const path = require('node:path');
const fs = require('node:fs');
const { uid } = require("./src/utils/uid");

async function execute() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: "dall-e-3",
        response_format: "b64_json",
        quality: "hd",
        prompt: "Create an image of a cat whose fur is pure white. The cat is sitting in a serene pose with its tail curled around its paws. It has bright, almond shaped eyes and its ears perked up in interest. The background is a homely setting with a soft rug under the cat and a cozy fireplace providing warm light in the room.",
        n: 1,                                //define the number of images
        size: '1024x1024',                     //define the resolution of image
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
      }
    );
    const { data } = response;
    const image = Buffer.from(data.data[0].b64_json, 'base64');
    // const image = data.data[0].b64_json;
    const filePath = path.join(process.cwd(), 'files', uid('.png'));
    /* destinationFilePath, stream, 'utf8' */
    await fs.writeFileSync(filePath, image);
    console.log(image);
    return path;
  } catch (err) {
    console.log({ err })
  }
}

(async () => execute())()