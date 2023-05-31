import mongoose from "mongoose";

const Schema = mongoose.Schema;
let RestaurantSchema = new Schema({
    name: String,
    address: String,
    rating: Number,
});

// UserSchema.statics.handleFindResults = function(type, results) {
//     let ret = [];
//     results.forEach(element => {
//         ret.push(`Find card with ${type}: (${element.name}, ${element.subject}, ${element.score})`)
//     });
//     return ret;
// }

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
export default Restaurant