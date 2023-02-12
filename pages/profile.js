import React, { useContext } from "react";
import { Ctx } from "../context/Context";

export default function Profile() {
    const ctx = useContext(Ctx);
    const { ctxData, changeCtxData } = ctx;
    console.log(ctxData, "ctxData");
    return <div>Profile</div>;
}
