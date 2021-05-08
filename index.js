const express = require("express");

const app = express();

app.get("/", (req, res) => res.send({ hi: "supa" }));

//if heroku pushes env variables, otherwise use 5000 (dev)
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// if (process.env.NODE_ENV === "production") {
//   //make sure Express will serve up production assets
//   app.use(express.static("client/build"));
//   //serve index.js if route unrecognized
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", index.html))
//   );
// }
