const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const orderSchema = mongoose.Schema({
    userid:{
        type: String
    },
    username:{
        type: String,
        maxlength:50
    },
    userphone:{
        type: String,
        maxlength:50
    },
    useraddress:{
        type: String
    },
    totalprice:{
        type: Number,
        default:0
    },
    discount:{
        type:Number,
        default: 0 
    },
    Ordered:{
        type:Array,
        default: []
    },
},{timestamps:true})



const Order = mongoose.model('Order',orderSchema );

module.exports = { Order } 