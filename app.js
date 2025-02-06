const express = require('express');
const app = express();
const moongoose = require('mongoose');
const mongoose = require("mongoose");
const getDate = require("./DateGetter")
const getTime = require("./TimeGetter")
const DateGetter = require("./DateGetter");
const cors = require("cors");
let dbID = null;
require("dotenv").config();

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("MongoDB Connected");
})

const userSchema = mongoose.Schema({
    loginDate : {
        type: String,
        default: "",
    },
    loginTime : {
        type : String,
        default : ""
    },
    exitTime : {
        type : String,
        default : ""
    },
    ipAddress : {
        type : String,
        default : ""
    },
    result : {
        type : String,
        default : ""
    },
    noClicks : {
        type : String,
        default : ""
    },
})
const userModel = new moongoose.model("userData", userSchema);


app.post("/login", async (req, res) => {
    const ipAddress = req.ip;
    const date = getDate();
    const time = getTime();
    const user = new userModel({
        ipAddress : ipAddress,
        loginTime : time,
        loginDate : date,
        result : "now only opened"
    })
    await user.save().then((user)=>{
        dbID = user._id;
    })
    res.sendStatus(200)
})

app.post("/logout", async (req, res) => {
    const time = getTime();
    const clicks = req.body.clicks;
    const result = "yesss";
    await userModel.findByIdAndUpdate(dbID,{
        exitTime : time,
        noClicks : clicks,
        result : result
    })
    res.sendStatus(200)
})

app.post("/quit", async (req, res) => {
    const time = getTime();
    const clicks = req.body.clicks;
    const result = "force Exit";
    await userModel.findByIdAndUpdate(dbID,{
        exitTime : time,
        noClicks : clicks,
        result : result
    })
    res.sendStatus(200)
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});