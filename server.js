// Grabs express
const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Sets the public folder static

app.use("/api", apiRoutes); // These paths will lead to the Router
app.use("/", htmlRoutes); // So no need to pass in app

app.listen(PORT, () => console.log(`Listening on http://localhost: ${PORT}`));
