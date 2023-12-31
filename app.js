const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.FName;
  const lastName = req.body.LName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/4bcf3cbb34";

  const options = {
    method: "POST",
    auth: "gaurav1:887e10c86c14d3bed455c6c5bc914dc9-us21",
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.send("Successfully subscribed!");
    } else {
      res.send("There was an error signing up please try again!");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  https.get(url, function () {});
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

//API key
// 887e10c86c14d3bed455c6c5bc914dc9-us21
