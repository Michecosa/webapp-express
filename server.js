require("dotenv").config();
const express = require("express");
const moviesRouter = require("./routers/movies");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/movies", moviesRouter);
app.use(errorHandler);
app.use(notFound);

app.get("/", (req, res) => {
  res.send("Ciao belli");
});

app.get("/errore", (req, res) => {
  throw new Error();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
