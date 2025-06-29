import mongoose from "mongoose";

const becomeFranchiseSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  investmentBudget: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},{timestamps:true});

export default mongoose.model("becomeFranchise", becomeFranchiseSchema);
