//jshint esversion: 6
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req,res)
{
  res.sendFile(__dirname + "/signup.html")
});



app.post("/", function (req, res) {


  var email = req.body.email;
  var fname = req.body.fname;
  var lname = req.body.lname;



  var data =
  {
    members : [
      {
        email_address : email ,
        status : "subscribed",
        merge_fields : {
          FNAME : fname,
          LNAME : lname
        }

      }
    ]
  }

  var jsonData = JSON.stringify(data);

  const url = "https://us7.api.mailchimp.com/3.0/lists/46f55624d5";

  const options =
  {
    method : 'POST' ,
    auth : "user:2b4419fe98bc14a3a3ffc8dc0aa2ef84-us7"
  }


  const request = https.request(url , options , function(response)
  {
    var code  = response.statusCode;
    if(code === 200 )
    {
      res.sendFile(__dirname + "/success.html");
    }
    else
    {
      res.sendFile(__dirname + "/failure.html");

          }
    response.on("data", function(data)
    {
      //console.log(JSON.parse(data));
    });



  });

  request.write(jsonData);
  request.end();



});




app.post("/failure" , function(req,res)
{
  res.redirect("/");
});






app.listen(process.env.PORT||3000, function()
{
  console.log("Server Started");
});
