const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multiparty = require("multiparty");
require("dotenv").config();
const nodemailer = require("nodemailer");

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser());

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get("/contact", (req, res) => {
  console.log("Just got a request!");
  res.send({ msg: "hello" });
});

// routes
app.post("/contact", (req, res) => {
  console.log(req);
  const data = req.body;
  console.log(data);
  res.send(data);
});

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0a71a32d9c99a2",
    pass: "233a6e4220243d",
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: "test 123",
      to: "inadeemnoushad@gmail.com",
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };
    console.log(mail);
    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});

// PORT
const PORT = process.env.PORT || 3000;
app.listen(() => console.log(`Server running on PORT ${PORT}`));
