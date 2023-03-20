/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Constants from "../../Constants";


const Login = () => {
	const navigate = useNavigate();

	const [input, setInput] = useState({});
	const [errors, setErrors] = useState([]);

	const handleInput = (e) =>
		setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

	const handleLogin = () => {
		axios
			.post(`${Constants.LOCAL_URL}/login`, input)
			.then((res) => {
				localStorage.email = res.data.email;
				localStorage.name = res.data.name;
				localStorage.token = res.data.token;
				window.location.reload();
			})
			.catch((errors) => {
				if (errors.response.status === 422) {
					setErrors(errors.response.data.errors);
				}
			});
	};

	useEffect(() => {
		if (localStorage.token !== undefined) {
			navigate("/");
		}
	}, []);

	return (
		<div className="container">
			<div className="w-1/2 mx-auto mt-20">
				<div className="bg-teal-500 text-center rounded-t">
					<h3 className="text-white font-bold py-3 text-xl">Login</h3>
				</div>
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<label className="block text-gray-700 font-bold mb-3">
						<p className="mb-1">Email:</p>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type={"email"}
							name={"email"}
							value={input.email}
							onChange={handleInput}
						/>
						<p className="text-red-400 text-sm">
							<small>{errors.email !== undefined ? errors.email[0] : null}</small>
						</p>
					</label>
					<label className="block text-gray-700 font-bold my-2">
						<p className="mb-1">Password:</p>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder={"password"}
							type={"password"}
							name={"password"}
							value={input.password}
							onChange={handleInput}
						/>
						<p className="text-red-400 text-sm">
							<small>
								{errors.password !== undefined ? errors.password[0] : null}
							</small>
						</p>
					</label>
					<div className="flex items-center justify-between ">
						<button
							onClick={handleLogin}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3"
						>
							Login
						</button>
						<Link
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Forgot Password?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
