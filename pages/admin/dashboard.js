import React, { useEffect, useState } from "react";
import axios from "axios";
import { showMessage } from "../../components/message";

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

    console.log(users, "users");

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
        <div classNameName="flex justify-center w-full">
            <table className="border-collapse w-2/3">
                <thead className="bg-gray-800 text-white">
                    <tr className="text-left">
                        <th className="py-2 px-4">Username</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Role</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((x) => (
                        <tr className="text-left border border-gray-400">
                            <td className="py-2 px-4">{x.userName}</td>
                            <td className="py-2 px-4">{x.email}</td>
                            <td className="py-2 px-4">{x.roles[0]}</td>
                            <td className="py-2 px-4">
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="mr-2">
                                        <path
                                            fill="currentColor"
                                            d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Z"
                                        />
                                    </svg>
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="mr-2">
                                        <path
                                            fill="currentColor"
                                            d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21Zm2-4h2V8H9Zm4 0h2V8h-2Z"
                                        />
                                    </svg>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
