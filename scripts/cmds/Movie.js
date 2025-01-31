const axios = require('axios');

module.exports = {
    config: {
        name: "movie",
        aliases: ['movieinfo'],
        author: "Hassan",
        version: "1.0",
        shortDescription: "Get information about a movie",
        longDescription: "Fetch detailed information about a specified movie.",
        category: "utility",
        guide: {
            vi: "",
            en: ""
        }
    },

    onStart: async function ({ args, message, getLang }) {
        try {
            const movieTitle = args.join(' ');
            if (!movieTitle) {
                return message.reply("Please provide a movie title.");
            }

            const apiKey = '435fb551';
            const url = `http://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

            
            const response = await axios.get(url);

            if (response.data && response.data.Response === "True") {
                const title = response.data.Title;
                const year = response.data.Year;
                const plot = response.data.Plot;
                const imdbRating = response.data.imdbRating;
                const poster = response.data.Poster;

                return message.reply(`🎬 Movie: ${title} (${year})\n⭐ Movie Rating: ${imdbRating}\n📖 Plot: ${plot}\n🖼️ Poster: ${poster}`);
            } else {
                return message.reply("Sorry, no information was found for the movie.");
            }
        } catch (error) {
            console.error(error);
            return message.reply("Sorry, there was an error fetching movie information.");
        }
    }
};
