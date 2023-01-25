const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get("/contact", (req, res) => {
  console.log("Just got a request!");
  res.send({ msg: "hello" });
});

app.post("/contact", (req, res) => {
  console.log(req);
  const data = req.body;
  console.log(data);
  res.send(data);
});

app.listen(process.env.PORT || 3000);
