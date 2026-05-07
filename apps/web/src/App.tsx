import type { LoaderFunctionArgs } from "react-router";
import { createBrowserRouter, RouterProvider, redirect } from "react-router";
import { AppLayout } from "@/layouts/AppLayout";
import { getSession } from "@/lib/auth-client";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProjectsPage from "@/pages/ProjectsPage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";

async function authLoader({ request }: LoaderFunctionArgs) {
	const { data: session } = await getSession();

	if (!session) {
		// Guardamos la URL destino + los query params
		const url = new URL(request.url);
		const next = url.pathname + url.search;

		throw redirect(`/?next=${encodeURIComponent(next)}`);
	}

	return { user: session.user };
}

async function loginLoader(_: LoaderFunctionArgs) {
	const { data: session } = await getSession();

	if (session) {
		throw redirect("/dashboard");
	}

	return null;
}

const router = createBrowserRouter([
	{
		path: "/",
		index: true,
		Component: SignInPage,
		loader: loginLoader,
	},
	{
		path: "/signup",
		Component: SignUpPage,
		loader: loginLoader,
	},
	{
		element: <AppLayout />,
		loader: authLoader,
		children: [
			{
				path: "/dashboard",
				Component: DashboardPage,
			},
			{
				path: "/projects",
				Component: ProjectsPage,
			},
		],
	},
	{
		path: "*",
		Component: NotFoundPage,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
