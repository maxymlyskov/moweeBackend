const config = require("config");

const mapper = movie => {
  const baseUrl = config.get("assetsBaseUrl");
  const mapImage = image => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`
  });

  return {
    ...movie,
    Poster: movie.Poster.map(mapImage)
  };
};

module.exports = mapper;
