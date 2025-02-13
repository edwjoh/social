import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { err } from "./interfaces/error-type";

interface user {
	isAuthenticated: boolean;
	userId: string | null;
	login: (email: string, password: string) => Promise<err>;
	logout: () => void;
}

const AuthContext = createContext<user | undefined>(undefined);

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);

	const [loading, setLoading] = useState(true);

	async function fetchUser() {
		const token = Cookies.get("token");
		if (!token) {
			setIsAuthenticated(false);
			setLoading(false);
			return;
		}
		try {
			const res = await fetch("http://localhost:3000/api/validera", {
				method: "POST",
				headers: {
					Authorization: token,
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}

			const data = await res.json();
			setUserId(data.id);
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchUser();
	}, []);
	async function login(email: string, password: string): Promise<err> {
		try {
			const res = await fetch("http://localhost:3000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: email, password: password }),
			});

			const data = await res.json();
			Cookies.set("token", data.token, { expires: 14, secure: true });
			setIsAuthenticated(true);
			if (res.ok) {
				return {
					msg: "Login funkade! Omdirigerar snart!",
					error: false,
				} as err;
			} else {
				return { msg: "Fel med inloggning!", error: true } as err;
			}
		} catch (error) {
			console.error("Fel med inloggning!:", error);
			return { msg: error, error: true } as err;
		}
	}

	function logout() {
		Cookies.remove("token");
		setIsAuthenticated(false);
		setUserId(null);
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, userId, login, logout }}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("feeell");
	}
	return context;
}
