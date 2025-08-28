const express= require('express')
const controller = require('./controller')
const app= express();
app.use(express.json());

app.post('/data',middleware,sendData);



function sendData(req,res){
    const data= req.body;
    res.json({mes:'data recieved',data:data});
}
function middleware(req,res,next){
    console.log('executed');
    next();
}


app.listen(8000);
 