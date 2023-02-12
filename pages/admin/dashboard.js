import React, { useEffect, useState } from "react";
import axios from "axios";
import { showMessage } from "../../tools/message";

export default function Dashboard(props) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
            .get("/api/admin/getAll")
            .then((response) => {
                console.log(response, "response");
                setUsers([...response.data.users]);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    showMessage({ show: true, message: error.response.data.message, type: "warning" });
                }
            });
    }, []);

    function editUser(user) {
        console.log(user, "user");
        axios
            .get("/api/admin/getAll")
            .then((response) => {
                console.log(response, "response");
                setUsers([...response.data.users]);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    showMessage({ show: true, message: error.response.data.message, type: "warning" });
                }
            });
    }

    return (
        <div>
            {users.map((x) => {
                return (
                    <div style={{ display: "flex", gap: 20 }}>
                        <div>email:</div>
                        <div>{x.email}</div>
                        <div>userName:</div>
                        <div>{x.userName}</div>
                        <div>role:</div>
                        <div>{x.roles[0]}</div>
                        <div onClick={() => editUser(x)}>edit</div>
                        <div>delete</div>
                    </div>
                );
            })}
        </div>
    );
}
