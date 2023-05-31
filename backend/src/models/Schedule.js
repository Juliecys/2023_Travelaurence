import mongoose from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;
let ScheduleSchema = new Schema({
    name: {type: String, required: [true, "name is required"]},
    user: {type: mongoose.Types.ObjectId, ref: "User", required: [true, "user is required"]},
    publicToAll: {type: Boolean, default: true},
    detail: [{  spot: {type: mongoose.Types.ObjectId, ref: "Spot"},
                title: {type: String},
                startDate: {type: String},
                endDate: {type: String},
                time: {type: String} }]
});

ScheduleSchema.pre("save", async function(){
    const user = await User.findById(this.user);
    user.schedule.push(this._id);
    await user.save();
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule