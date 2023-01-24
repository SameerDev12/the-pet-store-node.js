//This file contains product schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  image:{type:String,required:true},
  Category: { type: String, required: true },
  stock: { type: Number, default: 0, required: true },
});

const product=mongoose.model("product",productSchema);

export default product;
