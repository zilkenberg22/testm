import React, { useState } from "react";
import { signupValidate } from "../tools/validate";
import { showMessage } from "../components/message";
import axios from "axios";
import { useRouter } from "next/router";

export default function Signup() {
    const router = useRouter();
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

            let option = {
                headers: {
                    "Cache-Control": "no-cache",
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                timeout: 30000,
            };

            axios
                .post("/api/signup", JSON.stringify(form), option)
                .then((response) => {
                    showMessage({ show: true, message: response.data.message, type: "success" });
                    setForm({ userName: "", email: "", password: "" });
                    router.push("/login");
                })
                .catch((error) => {
                    if (error.response?.status === 401) {
                        showMessage({ show: true, message: error.response.data.message, type: "warning" });
                    } else if (error.response?.status === 400) {
                        showMessage({ show: true, message: error.response.data.message, type: "warning" });
                    }
                });
        } catch (error) {
            showMessage({ show: true, message: error, type: "warning" });
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        value={form.userName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
