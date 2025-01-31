const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  config: {
    name: "mage",
    aliases: ["poli"],
    version: "1.0",
    author: "Hassan",
    countDown: 15,
    role: 0,
    shortDescription: "Generate images using Poli API",
    longDescription: "Generate images by providing a prompt to the Poli API",
    category: "download",
    guide: {
      en: "{pn} <prompt>"
    }
  },

  onStart: async function ({ api, message, args }) {
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        return await message.reply("Please provide a prompt for image generation.");
      }

      const waitingMessage = await message.reply("🔄 Generating your image, please wait...");

      // Call the Poli API
      const response = await axios.get(`https://hassan-mage-api.onrender.com/poli?prompt=${encodeURIComponent(prompt)}`);
      
      if (response.status === 200 && response.data.imageUrl) {
        const imageUrl = response.data.imageUrl;
        const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', 'generated_image.jpg');
        await fs.outputFile(imgPath, imgResponse.data);
        const imgStream = fs.createReadStream(imgPath);

        api.unsendMessage(waitingMessage.messageID);

        await message.reply({
          body: "✅ | Your image has been generated successfully!",
          attachment: imgStream
        });
      } else {
        throw new Error("Invalid response from API.");
      }
    } catch (error) {
      console.error(error);
      await message.reply("❌ Image generation failed! Please check your prompt or try again later.");
    }
  }
};
