/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../../Constants";
import ResultModal from "../result/ResultModal";

const QuestionList = () => {
	const navigate = useNavigate();
	const [resultModalShow, setResultModalShow] = React.useState(false);
	const [finalScore, setFinalScore] = useState(0);
	const [examQuestions, setExamQuestions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [questions, setQuestions] = useState({});
	const [marks, setMarks] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState({});
	const [totalQuestions, setTotalQuestions] = useState(10);
	const [input, setInput] = useState({
		per_page: 2,
		type: "multiple",
		difficulty: "medium",
		category_id: 9,
	});

	const handleInput = (e) => {
		setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const getCategories = () => {
		axios.get(`${Constants.BASE_URL}api_category.php`).then((res) => {
			setCategories(res.data.trivia_categories);
		});
	};

	const getQuestions = () => {
		setTotalQuestions(input.per_page);
		axios
			.get(
				`${Constants.BASE_URL}api.php?amount=${input.per_page}&category=${input.category_id}&difficulty=${input.difficulty}&type=${input.type}`
			)
			.then((res) => res.data)
			.then((data) => {
				const questions = data.results.map((question) => ({
					...question,
					answers: [question.correct_answer, ...question.incorrect_answers].sort(
						() => Math.random() - 0.5
					),
				}));
				setQuestions(questions);
			});
	};

	const handleSelectAnswer = (answer, e, index) => {
		console.log(index, answer, e.target.value);
		let answer_selected = "wrong";
		if (answer == e.target.value) {
			answer_selected = "right";
		}
		setSelectedAnswer((prevState) => ({
			...prevState,
			[index]: {
				...prevState[index],
				[e.target.name]: e.target.value,
				...prevState[index],
				answer: answer,
				...prevState[index],
				result: answer_selected,
				...prevState[index],
				index: index,
			},
		}));
	};

	useEffect(() => {
		console.log(selectedAnswer);
	}, [selectedAnswer]);

	const handleAnswerSubmit = (questions, e, index) => {
		let score = 0;
		Object.keys(selectedAnswer).map((key) => {
			if (selectedAnswer[key].result == "right") {
				score++;
			}
		});
		setMarks(score);
		console.log(questions)
		console.log(score)	

		setResultModalShow(true);
	};

	useEffect(() => {
		getQuestions();
		getCategories();
	}, []);

	return (
		<>
			<div className="my-2 mx-auto w-full">
				<div className="container flex gap-4 items-center mx-auto w-full">
					<div className="w-1/3">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							type={"category_id"}
							name={"category_id"}
							value={input.category_id}
							onChange={handleInput}
						>
							<option selected>Select Category</option>
							{categories.map((category, index) => (
								<option key={index} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<div className="w-1/3">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name={"per_page"}
							value={input.per_page}
							onChange={handleInput}
						>
							<option selected>No of Question</option>
							<option value={"5"}>5</option>
							<option value={"10"}>10</option>
							<option value={"20"}>20</option>
						</select>
					</div>
					<div className="w-1/3">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name={"difficulty"}
							value={input.difficulty}
							onChange={handleInput}
						>
							<option selected>Difficulty Level</option>
							<option value={"any"}>Any Difficulty </option>
							<option value={"easy"}>Easy</option>
							<option value={"medium"}>Medium</option>
							<option value={"hard"}>Hard </option>
						</select>
					</div>
					<div className="w-1/3">
						<select
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							name={"type"}
							value={input.type}
							onChange={handleInput}
						>
							<option selected>Question Type</option>
							<option value={"any"}>Any Type </option>
							<option value={"multiple"}>Multiple Choice</option>
							<option value={"boolean"}>True/False </option>
						</select>
					</div>

					<div className="w-1/3">
						<div className="flex">
							<button
								onClick={() => getQuestions()}
								className="bg-green-800 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none"
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="p-5">
				<h2 className="text-xl mb-3">
					Answer following question:
				</h2>
				{Object.keys(questions).length > 0
					? questions.map((question, index) => (
							<div
								key={index}
								className="border border-gray-400 mb-4 p-4 rounded-lg}}"
							>
								<h3 className="mb-2">
									{++index}. {question.question}
								</h3>
								<div className="flex gap-4">
									<select
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										id={++index}
										name={"answer_option"}
										value={
											input[index] != undefined ? input[index].answer : null
										}
										onChange={(e) =>
											handleSelectAnswer(question.correct_answer, e, index)
										}
										disabled={selectedAnswer[index] != undefined ? true : false}
										required={true}
									>
										<option defaultValue="selected">Select Answer:</option>
										{question.answers.map((answer, onchangeindex) => (
											<option key={onchangeindex} value={answer}>
												{answer}
											</option>
										))}
									</select>
								</div>
							</div>
					  ))
					: ""}
				<div className="w-1/4">
					<div className="flex">
						<button
							onClick={(e) => handleAnswerSubmit(questions)}
							className="bg-green-800 hover:bg-green-700 text-white text-sm font-bold py-2 px-5 rounded focus:outline-none"
						>
							Result
						</button>
					</div>
					
				</div>
			</div>
			<ResultModal
				show={resultModalShow}
				onHide={() => setResultModalShow(false)}
				title={"Certificate Details"}
				size="lg"
				questions={questions}
				score={marks}
			/>

		</>
	);
};

export default QuestionList;
