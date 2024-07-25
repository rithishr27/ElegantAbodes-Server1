import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsi2Lqjnl1xlfXZU8s-wIkjxIYeZLY7vw0MQ&s"
    },
}, {timestamps:true})

const user = mongoose.model('User',UserSchema);

export default user;