const { default: axios } = require("axios");

async function execute() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: 'A beautiful sunset over a serene lake',
        n: 1,                                //define the number of images
        size: '1024x1024',                     //define the resolution of image
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer  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',
        },
      }
    );
    console.log(response);
    return response;

  } catch (err) {
    console.log({ err })
  }
}

(async () => execute())()