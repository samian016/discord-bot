#Discord Bot

Discord bot that integrates with ChatGPT for interactive chat, [DALL-E](https://openai.com/dall-e-2) and [Stable diffusion](https://stablediffusionweb.com/) for image generation and lastly Youtube for play audio music. It provides several slash commands for various functionalities.

## Features

- **ChatGPT Integration**.
- **Youtube Audio Music Player**.
- **Dall-E Image Generation**.
- **Stable Diffusion Image Generation**.
- **Query Stable Diffusion Image By ID**.
  
## Usage

1. **Slash Commands**:
   - `/ask`: To ask question to ChatGPT.
   - `/coverlater`: To generate Cover later for job circular.
   - `/play`: To play an audio music from youtube.
   - `/music`: To controll the music player.
   - `/dall-e`: To generate image from Dall-E.
   - `/stable-diff`: To generate image from Stable diffusion.
   - `/request-id`: To get immage by id that generated or missed from stable diffusion.
  
## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/samian016/discord-bot.git
   ```
2. **Enter the directory**:
   ```bash
   cd discord-Bot
   ```
3. **Install all dependencies**:
   ```bash
   yarn
   ```
4. **Create an discord bot from discord developer portal and get Bot token and Application ID**
5. **Insert all required environment variable in [dev.env](/config/dev.env)**:
   ```env
    BOT_TOKEN=""
    APPLICATION_ID=""
    OPENAI_API_KEY=""
    STABLE_DIFF_API_KEY=""'
    ```
6. **Run the server**:
   ```bash
   yarn dev
   ```
7. **Add the bot to your any discord server**
8. **Try all commands**
   
