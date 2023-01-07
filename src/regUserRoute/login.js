const express = require('express');
const DataModel = require('../todoDataModel/registruserData');
const jwt  = require('jsonwebtoken')

const regRout = express.Router();

regRout.post('/register', async(req,res)=>{
    
    try {
        let {userName,password} = req.body;
        console.log("register")
        let user = DataModel.findOne({user_name:userName})
        console.log("register")
        if(!user){
            res.status(401).json({
                status:'Failed',
                message:"User Already register with this Username"
            })
        }
        else{
            console.log(req.body)
            let dataInDB = await DataModel.create(req.body);

            res.status(200).json({
                status:'Success',
                dataInDB
            })
        }

        
    } catch (e) {
        res.status(400).json({
            status:"Failed",
            message: e.message
        })        
    }
})



regRout.post('/login', async(req,res)=>{
    try {
       let password = req.body.password;
        console.log(req.body.user_name)
        let user = await DataModel.findOne({user_name:req.body.user_name})
        console.log(req.body)
        if(!user){
            res.status(401).json({
                status:'Failed',
                message:"User is not register with this Username"
            })
        }
        else{
            
            let pass = user.password;
            if(password.match(pass)){
                let token = await jwt.sign({
                    exp:Math.floor(Date.now() / 1000 + (60*60)),
                    data:user._id
                },'DidbyAnoop')
                
                res.status(200).json({
                    status:'Success',
                    token
                })
            }
            else{
                res.status(402).json({
                    status:"Failed"
                })
            }
        }

        
    } catch (e) {
        res.status(400).json({
            status:"Failed",
            message: e.message
        })        
    }
})


module.exports = regRout;