import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Constants from "../../Constants";
import GlobalFunction from "../../GlobalFunction";
const Nav = () => {

	const handleLogout = () => {
		axios
			.post(`${Constants.LOCAL_URL}/logout`)
			.then((res) => {
				GlobalFunction.logout();
				window.location.reload();
			})
			.catch((errors) => {
				GlobalFunction.logout();
			});
	}
	
	return (
		<>
			<nav className="bg-gray-800 px-2 py-2">
				<div className="container mx-auto flex justify-between">
					<ul className="flex items-center">
						<li>
							<Link
								className="text-gray-300 hover:text-white hover:bg-slate-500 px-3 py-2 rounded-md text-sm font-medium"
								to="/"
							>
								<i className="">Dashboard</i>
							</Link>
						</li>
						<li>
							<Link
								className="text-gray-300 hover:text-white hover:bg-slate-500 px-3 py-2 rounded-md text-sm font-medium"
								to="/categories"
							>
								<i className="">Categories</i>
							</Link>
						</li>
						<li>
							<Link
								className="text-gray-300 hover:text-white hover:bg-slate-500 px-3 py-2 rounded-md text-sm font-medium"
								to="/exam"
							>
								<i className="">Exam</i>
							</Link>
						</li>
						<li>
							<button onClick={handleLogout} className="text-gray-300 hover:text-white hover:bg-slate-500 px-3 py-2 rounded-md text-sm font-medium">
								Logout
							</button>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Nav;
