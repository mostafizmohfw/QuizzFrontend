import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Login";
import AuthLayout from "../layouts/AuthLayout";

const PublicRouter = createBrowserRouter([
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: <Login />,
			},
		],
	},
]);

export default PublicRouter;
