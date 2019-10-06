request = require("request");
// your application requests authorization
const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret

let authOptions_spotify = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
  },
  form: {
    grant_type: "client_credentials"
  },
  json: true
};
let authOptions_vimeo = {
  url: "https://api.vimeo.com/oauth/authorize/client",
  headers: {
    Authorization:
      "Basic " +
      Buffer.from(
        "6811e7c8428189dfc7fb53683c26d5ef571f1097" +
          ":" +
          "HurpYqy0PRG6wDT5uZQPDqWN++VDaYnn0D5niOwfdyHHAaXbM9kfI0BljQyk5COH+J/vg8VlLdoqN69x/077gQXGuTc3h4GYXQA8gl8aMHdx0q9+7s/UdcORFSPbm2sL"
      ).toString("base64"),
    Accept: "application/vnd.vimeo.*+json;version=3.4"
  },
  form: {
    grant_type: "client_credentials",
    scope: "public"
  },
  json: true
};

let vimeoToken = (req, res, next) => {
  request.post(authOptions_vimeo, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Vimeo Web API
      res.locals.token = body.access_token;
      next();
    }
  });
};

let spotifyToken = (req, res, next) => {
  request.post(authOptions_spotify, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Vimeo Web API
      res.locals.token = body.access_token;
      next();
    }
  });
};
module.exports = { vimeoToken, spotifyToken };
