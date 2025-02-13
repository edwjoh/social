import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import Navbar from "./Components/Navbar";
import Protected from "./Protected";
import SkapaPage from "./Pages/SkapaPage";
import KontoPage from "./Pages/KontoPage";
function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<AuthPage />} />

				<Route element={<Protected />}>
					<Route path="/skapa" element={<SkapaPage />} />
					<Route path="/konto" element={<KontoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
