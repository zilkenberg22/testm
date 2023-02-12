import React, { useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { showMessage } from "../tools/message";
import { Ctx } from "../context/Context";

export default function Navbar({ children }) {
    const router = useRouter();
    const ctx = useContext(Ctx);
    const { ctxData, changeCtxData } = ctx;

    async function logout() {
        let option = {
            headers: {
                "Cache-Control": "no-cache",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${ctxData.isLogged ? ctxData.loggedUserData.accessToken : ""}`,
            },
            timeout: 30000,
        };

        axios
            .post("/api/logout", JSON.stringify(ctxData.loggedUserData.refreshToken), option)
            .then((response) => {
                ctxData.loggedUserData = null;
                ctxData.isAdmin = false;
                ctxData.isLogged = false;
                changeCtxData();
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
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
                <h1>Next JS Security Practices</h1>
                <div style={{ display: "flex", gap: 20 }}>
                    <Link href="/">Home</Link>
                    {ctxData.isAdmin && ctxData.isLogged && <Link href="/admin/dashboard">Dashboard</Link>}
                    {ctxData.isLogged ? (
                        <>
                            <Link href="/profile">Profile</Link>
                            <div onClick={() => logout()}>Logout</div>
                        </>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/signup">Signup</Link>
                        </>
                    )}
                </div>
            </div>
            {children}
        </>
    );
}
