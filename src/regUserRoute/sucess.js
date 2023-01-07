const express = require('express');
const DataModel = require('../todoDataModel/registruserData');


const successRoute  = express()
successRoute.post('/successfulLogin', async(req,res)=>{
    
    try {
        let data = req.body;
        let id  = req.user
        
        
        let dataInDB = await DataModel.updateOne({_id:id}, {$push:{"todo_list":data}});
        console.log(dataInDB)
        res.status(200).json({
            status:'Success',
            dataInDB
        })
    }   
     catch (e) {
        res.status(400).json({
            status:"Failed",
            message: e.message
        })        
    }
});
successRoute.get('/successfulLogin', async(req,res)=>{
    
    try {
        let id  = req.user
        
        
        let dataInDB = await DataModel.find({_id:id});
        console.log(dataInDB)
        res.status(200).json({
            status:'Success',
            dataInDB
        })
    }   
     catch (e) {
        res.status(400).json({
            status:"Failed",
            message: e.message
        })        
    }
});

module.exports = successRoute;



