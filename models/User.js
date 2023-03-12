import mongoose from "mongoose";

//create user model
const UserSchema = new mongoose.Schema({
    nickName: {
        type: 'string',
        required: true,
        unique: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    passwordHash: {
        type: 'string',
        required: true
    },
    isActive: {
        type: 'boolean',
        default: false
    }

}, {
    timestamps: true
});

export default mongoose.model("User", UserSchema);