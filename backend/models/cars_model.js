const {Schema, model, Mongoose} = require('mongoose');

const carSchema = new Schema({
    carname : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }, 
    image : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true
    },

    tags : {
        type : String,
        required : true
    },


    // 
    cust_id : {
        type : String, 
        default : ""
    },  
    transaction_id : {
        type : String, 
        default : ""
    }

})
 
const Car = new model("Car", carSchema);

module.exports = Car;