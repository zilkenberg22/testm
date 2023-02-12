import dbConnect from "../../server/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    await dbConnect();

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ error: true, message: "User with given email already exist" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();

        res.status(201).json({ error: false, message: "Account created sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}
