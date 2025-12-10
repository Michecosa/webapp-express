require("dotenv").config();
const express = require("express");
const moviesRouter = require("./routers/movies");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Ciao belli");
});

app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
