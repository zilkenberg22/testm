import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    roles: {
        type: [String],
        enum: ["user", "admin"],
        default: ["user"],
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
