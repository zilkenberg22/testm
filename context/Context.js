import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
export const Ctx = createContext({});

export default function Context(props) {
    const router = useRouter();
    const [ctxData, setCtxData] = useState({
        loggedUserData: null,
        isAdmin: false,
        isLogged: false,
    });

    let allowed = true;

    useEffect(() => {
        if (router.pathname.startsWith("/admin") && !ctxData.isAdmin) {
            allowed = false;
        } else if (!ctxData.isLogged) allowed = false;
    }, []);

    useEffect(() => {
        if (!allowed) router.push("/");
    }, [allowed]);

    useEffect(() => {
        if (ctxData.loggedUserData && ctxData.loggedUserData.data) {
            if (ctxData.loggedUserData.data.roles[0] === "admin") ctxData.isAdmin = true;
            else ctxData.isAdmin = false;
            ctxData.isLogged = true;
        } else {
            ctxData.loggedUserData = null;
            ctxData.isAdmin = false;
            ctxData.isLogged = false;
        }
        changeCtxData();
    }, [ctxData.loggedUserData]);

    console.log(ctxData, "ctxData");

    function changeCtxData() {
        setCtxData({ ...ctxData });
    }

    return (
        <Ctx.Provider value={{ ctxData, changeCtxData }}>
            <Navbar>{allowed && props.children}</Navbar>
        </Ctx.Provider>
    );
}
