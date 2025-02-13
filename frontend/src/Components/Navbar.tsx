import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	return (
		<header className="flex justify-between items-center p-6 bg-blue-50 border-b-2 border-blue-200">
			<button
				onClick={() => navigate("/")}
				className="bg-transparent border-none cursor-pointer"
			>
				<h1 className="text-3xl font-extrabold text-blue-600">
					twitter
				</h1>
			</button>
			<div className="flex items-center gap-6">
				{isAuthenticated ? (
					<button
						onClick={() => navigate("/skapa")}
						className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 4.5v15m7.5-7.5h-15"
							/>
						</svg>
						<span>Skapa inlägg</span>
					</button>
				) : (
					<button
						onClick={() => navigate("/login")}
						className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
							/>
						</svg>
						<span>Logga in</span>
					</button>
				)}
				<button
					onClick={() => navigate("/konto")}
					className="text-blue-600 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="size-10"
					>
						<path
							fillRule="evenodd"
							d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</header>
	);
}

export default Navbar;
