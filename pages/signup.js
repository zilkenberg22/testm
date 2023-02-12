import React, { useState } from "react";
import { signupValidate } from "../tools/validate";
import { showMessage } from "../tools/message";

export default function Signup() {
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        signupData();
    }

    async function signupData() {
        try {
            const err = signupValidate(form);
            if (err?.error) {
                showMessage({ show: true, message: err.message, type: "warning" });
                return;
            }
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                throw new Error(res.status);
            }

            showMessage({ show: true, message: "Амжилттай бүргүүллээ", type: "success" });

            setForm({ userName: "", email: "", password: "" });
        } catch (error) {
            showMessage({ show: true, message: error, type: "warning" });
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Username</label>
                <input type="text" maxLength="50" name="userName" value={form.userName} onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" maxLength="50" name="email" value={form.email} onChange={handleChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" maxLength="30" minLength="8" name="password" value={form.password} onChange={handleChange} required />

                <button type="submit" className="btn">
                    Submit
                </button>
            </form>
        </div>
    );
}
