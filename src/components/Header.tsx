import { FaBell, FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";

export default function Header({ username }: { username: string }) {
    return (
        <div className="flex justify-between items-center bg-white shadow p-4 rounded-lg ml-12 md:ml-0">
            <h2 className="text-md md:text-lg font-bold">Welcome! {username}</h2>
            <div className="flex space-x-4 items-center ">
                <FaBell className="text-gray-600 text-xl cursor-pointer" />
                <FaUserCircle className="text-gray-600 text-xl cursor-pointer" />
                <button onClick={() => signOut()}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm"
                >
                    <BiLogOut className="text-lg" /> Logout
                </button>
            </div>
        </div>
    );
}
