const express = require("express")
const parser = require("body-parser")
const axios = require("axios")


const app = express().use(parser.json())

const token = "EAAaY9i6XqwkBAFZApnVaUCPUth3QUn9GXtViVrxTEksaDTcKeeMV0XtxzBgXmoapxZCjARN8Y1T4uy98fbmE5BZCj2GFPUGIh7hHBqHZCjZAzzPm0OJTHZAoQetY2OlrvAFj6tCVEhORba4rQXurK3hJT0F3mEbnqq3nZCy1BpOQlBPLCkAD3wvrtX2w3nyJbwqqmeaClbCawZDZD";
const myToken = "aditya"

app.listen(8000, ()=>{
    console.log("listening")
});


app.get("/", (req,res)=>{
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let tokenf = req.query["hub.verify_token"];

    if(mode && token){
        if(mode == "subscribe" && tokenf == myToken){
            res.status(200).send(challenge);
        }else{
            res.status(403);
        }
    }
})


app.post("/", (req,res)=>{
    let body_param = req.body;

    console.log(JSON.stringify(body_param, null, 2));

    if(body_param.object){
        if(body_param.entry &&
            body_param.entry[0].changes &&
            body_param.entry[0].changes[0].value.messages &&
            body_param.entry[0].changes[0].value.messages[0]){
                let phon_no_id=body_param.entry[0].challange[0].value.metadata.phone_number_id;
                let from = body_param.entry[0].changes[0].value.messages[0].from;
                let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;
   
        axios({
            method: "POST",
            url: "https://graph.facebook.com/v13.0/"+phon_no_id+"/message7access_tokens"+token,
            data:{
                messaging_product: "whatsapp",
                to:from,
                text:{
                    body: "Hi.. I'm Aditya"
                }
            },
            headers:{
                "Content-Type":"application/json"
            }
        });
         res.sendStatus (200);
    }else{
            res.sendStatus(404);
        }
    }
        
})

// app.get("/", (req, res)=>{
//     res.status(200).send("Hello....")
// })

//6:18