 
const path = require("path");
const express = require("express");
const app = express(); // create express app
const port = process.env.PORT || 3000


// add middlewares
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port
app.listen(port, () => {
  console.log("server started on port " + port);
});