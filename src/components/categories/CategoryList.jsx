/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Constants from "../../Constants";

const CategoryList = () => {

	const [categories, setCategories] = useState([]);
	const [categoriesDetails, setCategoriesDetails] = useState([]);

	const getCategories = () => {
		axios.get(`${Constants.BASE_URL}api_category.php`).then((res) => {
			setCategories(res.data.trivia_categories);
		});
	};


	useEffect(() => {
		getCategories();
		setCategoriesDetails();
	}, []);

	return (
		<>
			<table className="table-auto my-2 w-full">
				<thead>
					<tr>
						<th className="border border-gray-700 px-5 py-2">ID</th>
						<th className="border border-gray-700 px-5 py-2">Category Name </th>
						<th className="border border-gray-700 px-5 py-2">Action</th>
					</tr>
				</thead>
				<tbody className="">
					{Object.keys(categories).length > 0
						? categories.map((category, id) => (
								<tr key={id}>
									<td className="border border-gray-700 px-5 py-2">
										{category.id}
									</td>
									<td className="border border-gray-700 px-5 py-2">
										{category.name}
									</td>
									<td className="border border-gray-700 px-5 py-2">
										<Link to={`/category-question/${category.id}`}>
											<button												
												className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
											>
												view
											</button>
										</Link>
									</td>
								</tr>
						  ))
						: "No data found"}
				</tbody>
			</table>
		</>
	);
};

export default CategoryList;
