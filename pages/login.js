import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { loginValidate } from "../tools/validate";
import { showMessage } from "../tools/message";
import { Ctx } from "../context/Context";

export default function Login() {
    const router = useRouter();
    const ctx = useContext(Ctx);
    const { ctxData, changeCtxData } = ctx;
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        loginData();
    }

    async function loginData() {
        const err = loginValidate(form);
        if (err?.error) {
            showMessage({ show: true, message: err.message, type: "warning" });
            return;
        }

        let option = {
            headers: {
                "Cache-Control": "no-cache",
                Accept: "application/json",
                "Content-Type": "application/json",
                //  Authorization: `Bearer ${nevtrekhEsekh ? global.ibi_nevtrekhErkh_token : global.ibi_undsenErkh_token}`,
            },
            timeout: 30000,
        };

        axios
            .post("/api/login", JSON.stringify(form), option)
            .then((response) => {
                ctxData.loggedUserData = {
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                    data: response.data.data,
                };
                changeCtxData();
                setForm({ userName: "", email: "", password: "" });
                showMessage({ show: true, message: response.data.message, type: "success" });
                router.push("/");
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    showMessage({ show: true, message: error.response.data.message, type: "warning" });
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
