// server.js

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));

function readJSON(file, fallback){

    if(!fs.existsSync(file)){
        fs.writeFileSync(file, JSON.stringify(fallback,null,2));
    }

    return JSON.parse(fs.readFileSync(file));

}

function saveJSON(file,data){

    fs.writeFileSync(file, JSON.stringify(data,null,2));

}

app.use((req,res,next)=>{

    const stats = readJSON("./data/stats.json",{
        total:0,
        daily:{},
        monthly:{},
        logs:[]
    });

    const now = new Date();

    const day = now.toISOString().slice(0,10);
    const month = day.slice(0,7);

    stats.total++;

    stats.daily[day] = (stats.daily[day] || 0) + 1;
    stats.monthly[month] = (stats.monthly[month] || 0) + 1;

    stats.logs.push({
        ip:req.headers["x-forwarded-for"] || req.socket.remoteAddress,
        device:req.headers["user-agent"],
        time:now.toLocaleString()
    });

    if(stats.logs.length > 50){
        stats.logs.shift();
    }

    saveJSON("./data/stats.json",stats);

    next();

});

app.get("/api/stats",(req,res)=>{

    const stats = readJSON("./data/stats.json",{
        total:0,
        daily:{},
        monthly:{},
        logs:[]
    });

    const now = new Date();

    const day = now.toISOString().slice(0,10);
    const month = day.slice(0,7);

    const labels = Object.keys(stats.daily).slice(-7);
    const values = Object.values(stats.daily).slice(-7);

    res.json({
        total:stats.total,
        today:stats.daily[day] || 0,
        month:stats.monthly[month] || 0,
        online:Math.floor(Math.random()*20)+1,
        chartLabels:labels,
        chartData:values,
        logs:stats.logs
    });

});

app.get("/", (req,res)=>{

    const pass = req.query.pass;

    if(pass !== "NghialqTV2026"){
        return res.send(`
        <h2>❌ Sai mật khẩu admin</h2>
        `);
    }

    res.sendFile(
        path.join(
            __dirname,
            "public/admin.html"
        )
    );

});

app.listen(3000,()=>{
    console.log("Server running");
});
