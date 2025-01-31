const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "supportgc",
    aliases: ["exe"],
    version: "1.0",
    author: "ncs pro",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "add user in thread"
    },
    longDescription: {
      vi: "",
      en: "add any user to bot owner group chat"
    },
    category: "GroupMsg",
    guide: {
      en: "{pn} uchiha"
    }
  },

  onStart: async function ({ api, event, args }) {
    const threadID = "10062386990444354";
    try {
      // Check if the user is already in the group chat
      const threadInfo = await api.getThreadInfo(threadID);
      const participants = threadInfo.participantIDs;

      if (participants.includes(event.senderID)) {
        api.sendMessage("🍀 ʏᴏᴜ ᴡᴇʀᴇ ɪʟʀᴇᴀᴅʏ ᴀᴅᴅᴇᴅ ᴛᴏ ᴘʀɪɴᴄᴇꜱ ꜱᴜᴘᴘᴏʀᴛʙᴏx  welcome all types supportgc to join princes supportbox 🙂 🍀", event.threadID);

        // Set ⚠ reaction for already added user
        api.setMessageReaction("⚠", event.messageID, "💌", api);
      } else {
        // If not, add the user to the group chat
        await api.addUserToGroup(event.senderID, threadID);
        api.sendMessage("🎊 | 𝑻'𝒂𝒔 𝒆𝒕𝒆 𝒂𝒋𝒐𝒖𝒕𝒆 𝒂𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 🌪️✨웃『you are already added in the PRINCES SUPPORTBOX GROUP if you didn't find it pls check your message request or Spam box. 』ヅ✨🌪️", event.threadID);

        // Set 💛 reaction for successfully added user
        api.setMessageReaction("🍀", event.messageID, "💌", api);
      }
    } catch (error) {
      api.sendMessage("🙀 | Failed to add you to the group chat.\nk:", event.threadID);

      // Set 🙆 reaction for failed adding user
      api.setMessageReaction("💀", event.messageID, "👍", api);
    }
  }
  }
