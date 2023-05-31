import mongoose from "mongoose";

const Schema = mongoose.Schema;
let SpotSchema = new Schema({
    name: {type: String, required: [true, "name is required"]},
    type: {type: String, required: [true, "type is required"]},
    location: {type: String, required: [true, "location is required"]},
    phone: {type: String, required: [true, "phone is required"]},
    review: [{type: mongoose.Types.ObjectId, ref: "Review"}],
    pic: {type: String},
});

const Spot = mongoose.model('Spot', SpotSchema);
export default Spot