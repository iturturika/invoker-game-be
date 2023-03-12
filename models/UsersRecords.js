import mongoose from "mongoose";

//create user model
const UsersRecordsSchema = new mongoose.Schema({
    nickName: {
        type: 'string',
        required: true
    },
    id: {
        type: 'string',
        required: true
    },
    record: {
        type: 'Number',
        required: true
    }

}, {
    timestamps: true
});

export default mongoose.model("UsersRecordsModel", UsersRecordsSchema);