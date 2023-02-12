import dbConnect from "../../server/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    await dbConnect();

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ error: true, message: "И-Майл хаяг бүртгэгдсэн байна" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();

        res.status(201).json({ error: false, message: "Бүртгэл амжилттай" });
    } catch (err) {
        res.status(500).json({ error: true, message: "Сервер ачааллах боломжгүй байна" });
    }
}
