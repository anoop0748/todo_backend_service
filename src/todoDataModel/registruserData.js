const mongoose = require('mongoose');
const Schema = mongoose.Schema

const reg_user_data = new Schema({
    user_name :{type:String, required:true},
    password: {type:String, required:true},
    todo_list :{type:Array,required:false}
})


const todoDataModel = mongoose.model('Todo_Data', reg_user_data);


module.exports = todoDataModel;