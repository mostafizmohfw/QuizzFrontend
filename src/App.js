import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
// import "./AxiosInterceptors";
import ProjectRouter from "./components/router/ProjectRouter";
import PublicRouter from "./components/router/PublicRouter";

function App() {	const [auth, setAuth] = useState(false);

	useEffect(() => {
		if (localStorage.token !== undefined) {
			setAuth(true);
		}
	}, []);

	return (
		<>
			{auth ? (
				<RouterProvider router={ProjectRouter} />
			) : (
				<RouterProvider router={PublicRouter} />
			)}
		</>
	);
}

export default App;
