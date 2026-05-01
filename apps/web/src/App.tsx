import { BrowserRouter, Route, Routes } from "react-router";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index path="/" element={<SignInPage />} />
				<Route path="/signup" element={<SignUpPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
