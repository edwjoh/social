import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../styles.css";
import { AuthProvider } from "./AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
	<AuthProvider>
		<App />
	</AuthProvider>
);
