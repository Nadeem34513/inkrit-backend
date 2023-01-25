const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/contact", (req, res) => {
  console.log("Just got a request!");
  res.send({ msg: "hello" });
});
app.post("/contact", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send(data);
});

app.listen(process.env.PORT || 3000);
