import mongoose from "mongoose";
import Spot from "./Spot";
import User from "./User";

const Schema = mongoose.Schema;
let ReviewSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User', required: [true, "dependent user is required"]},
    spot: {type: mongoose.Types.ObjectId, ref: 'Spot', required: [true, "dependent spot is required"]},
    content: {type: String, required: [true, "content is required"]},
    rating: {type: Number, required: [true, "rating is required"]},
});

ReviewSchema.pre("save", async function(){
    const spot = await Spot.findById(this.spot);
    spot.review.push(this._id);
    await spot.save();
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review