const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Ciao belli");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
