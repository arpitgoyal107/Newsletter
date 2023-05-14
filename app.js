const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})
app.get("/success", (req,res)=>{
    res.sendFile(__dirname+"/success.html")
})
app.get("/failure", (req,res)=>{
    res.sendFile(__dirname+"/failure.html")
})

app.post("/", (req,res)=>{

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const jsondata= JSON.stringify(data);

    // const apikey="2f737b7e66dbb93aa123be3609d12f2c-us21";
    // const listid="c2f0034a47";
    const url='https://us21.api.mailchimp.com/3.0/lists/c2f0034a47';

    const options={
        method: "POST",
        url: url,
        // auth: "arpit1:2f737b7e66dbb93aa123be3609d12f2c-us21",
        headers:{
            "Authorization": "arpit20 2f737b7e66dbb93aa123be3609d12f2c-us21"
        },
        // body: jsondata,
    }

    // const request = https.request(url, options, (response)=>{
    //     response.on("data", (data)=>{
    //         console.log(JSON.parse(data));
    //     })        
    // })
    // request.write(jsondata);
    // request.end;s

    request(options, (error,response)=>{
        if(error){
            console.log(error.statusCode);
        }
        else{
            console.log(response.statusCode);
            if(response.statusCode===200){
                res.redirect("/success")
            }
            else{
                res.redirect("/failure")
            }
        }
    })
})

app.post("/failure", (req,res)=>{
    res.redirect("/");
})

app.listen(3000, (req,res)=>{
    console.log("Server started at port 3000");
})

// 2f737b7e66dbb93aa123be3609d12f2c-us21
// c2f0034a47