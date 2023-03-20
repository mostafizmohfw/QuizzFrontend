/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Constants from "../../Constants";


const CategoryQuestions = () => {
	const params = useParams();
	const [questions, setQuestions] = useState([]);

	const getQuestions = () => {
		axios.get(`${Constants.BASE_URL}api.php?amount=20&category=${params.id}`).then((res) => {
			setQuestions(res.data.results);
		});
	};

	useEffect(() => {
		getQuestions();
	}, [])
	
	return (
		<div>
			<h2 className="text-center bg-slate-400 py-2 text-white text-xl">Question List</h2>
			<table className="table-auto w-full mb-2">
				<thead>
					<tr>
						<th className="border border-gray-700 px-5 py-2">ID</th>
						<th className="border border-gray-700 px-5 py-2">Category</th>
						<th className="border border-gray-700 px-5 py-2">Question</th>
						<th className="border border-gray-700 px-5 py-2">Type</th>
						<th className="border border-gray-700 px-5 py-2">Difficulty</th>
						<th className="border border-gray-700 px-5 py-2">Answer</th>
						<th className="border border-gray-700 px-5 py-2">Incorrect Answers</th>
					</tr>
				</thead>
				<tbody className="">
				{Object.keys(questions).length > 0
						? questions.map((question, index) => (
					<tr key={index}>
						<td className="border border-gray-700 px-5 py-2">
						{++index}
						</td>
						<td className="border border-gray-700 px-5 py-2">
						{question.category}
						</td>
						<td className="border border-gray-700 px-5 py-2">
						{question.question}
						</td>
						<td className="border border-gray-700 px-5 py-2">
						{question.type}
						</td>
						<td className="border border-gray-700 px-5 py-2">
						{question.difficulty}
						</td>
						<td className="border border-gray-700 px-5 py-2">
						{question.correct_answer}
						</td>
						<td className="border border-gray-700 px-5 py-2">
						{question.incorrect_answers.map((incorect_answer, index) =>(
							<p key={index}>{++index}. {incorect_answer}</p>
						))}
						</td>
					</tr>
					))
					: "No data found"}
				</tbody>
			</table>
		</div>
	);
};

export default CategoryQuestions;
