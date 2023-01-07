const express = require('express');
const mongoose = require('mongoose');
const regApp = require('./regUserRoute/login')
const afterLogin = require('./regUserRoute/sucess')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const port = process.env.port || 5000
const MongoDBUri = process.env.MongoDBUri || 'mongodb://localhost:27017'

const app = express();
mongoose.set('strictQuery', true);
mongoose.connect(MongoDBUri,(e)=>{
    if(e){
        console.log(e)
    }else{
        console.log('connect to DB')
    }
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(regApp)
app.use('/successfulLogin', async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'DidbyAnoop', function (err, decoded) {
            if (err) {

                return res.json({
                    status: 'Fail',
                    massage: "Not a valid token."
                })
            }
            console.log(decoded.data)
            req.user = decoded.data;
            
            next();
        })
    }
    else {
        return res.status(401).json({
            status: 'Fail',
            massage: 'Token not Found'
        })
    }
})
app.use(afterLogin )
app.listen(port,(e)=>{
    if(e){console.log(e)}
    else{console.log(`server is running on port ${port}`)}
})