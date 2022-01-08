//jshint eversion:6

const express = require("express");
const app = express();
const mailchimp = require("@mailchimp/mailchimp_marketing");
/* const https = require("https"); */

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
    apiKey: "1434c3748a539f6c7bb55bc1b3eb4eb9-us5",
    server: "us5"
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const listid = "be1ee942b7";

    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    async function run(){
        const response = await mailchimp.lists.addListMember(listid, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });

    res.sendFile(__dirname + "/success.html");
    // console.log(`Successfully added contact as an audience member.`);
    };

    run().catch(e => res.sendFile(__dirname + "/failure.html"));

    // *********************This piece of code is old and not valid now**************************
    // var data = {
    //     members: [
    //         {
    //             email_address: email,
    //             status: "subscribed",
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName
    //             }
    //         }
    //     ]
    // };

    // var jsonData = JSON.stringify(data);
    // const url = "https://us6.api.mailchimp.com/4.0.lists/be1ee942b7";

    // const options = {
    //     method: "POST",
    //     auth: "shubham:1434c3748a539f6c7bb55bc1b3eb4eb9-us5"
    // }

    // const request = https.request(url, options, function (response) {

    //     if(response.statusCode === 200){
    //         res.send("Successfully subscribed!");
    //     }else {
    //         res.send("Please try again!!");
    //     }

    //     response.on("data", function (req, res) {
    //         console.log(JSON.parse(data));
    //     })
    // })

    // request.write(jsonData);
    // request.end();
 
    
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function (req, res) { // process.env.PORT is defined by heroku
    console.log("Server running at port: 3000");
});


// 1434c3748a539f6c7bb55bc1b3eb4eb9-us5
// be1ee942b7