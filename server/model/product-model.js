const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    category:{type:String,require:true},
    brand:{type:String,require:true},
    color:{type:String,require:true},
    price:{type:Number,require:true},
    offerday:{type:Number,require:true},
    offerpercentage:{type:Number,require:true},
    productimage:{type:String,require:true},
    details:{type:String,require:true},
    available:{type:String,require:true},
    delivery:{type:String,require:true},
})

const ProductList = mongoose.model('ProductList',productSchema);
module.exports =ProductList;