/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../partials/Footer";
import Nav from "../partials/Nav";
const Master = () => {
	return (
		<>
			<div className="container">
				<div className="content w-3/4 mx-auto">
					<Nav />
					<Outlet />
					<Footer />
				</div>
			</div>
		</>
	);
};

export default Master;
