import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/authContext.tsx";

createRoot(document.getElementById("root")!).render(
	<>
		<head>
			<link rel="icon" type="image/svg" href="/ico.svg" />
		</head>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</>,
);
