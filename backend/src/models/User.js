import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;
let UserSchema = new Schema({
    name: {type: String, required: [true, "Name is required"]},
    email: {type: String, required: [true, "email is required"]},
    password: {type: String, required: [true, "pwd is required"]},
    schedule: [{type: mongoose.Types.ObjectId, ref: 'Schedule'}],
    wishlist: [{type: mongoose.Types.ObjectId, ref: 'Spot'}]
});

UserSchema.methods.hashPwd = function(){
    return bcrypt.hashSync(this.password, 8);
};

UserSchema.methods.validatePassword = async function(unencryptedPassword){
    return bcrypt.compareSync(unencryptedPassword, this.password);
}

const User = mongoose.model('User', UserSchema);
export default User