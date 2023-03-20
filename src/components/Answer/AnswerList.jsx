import React from "react";

const AnswerList = (props) => {
	console.log(props.questions)
	console.log(props.score)
	return (
		<>
			<h2 className="text-xl mb-3">
			{localStorage.name !== undefined ? localStorage.name : ""} look at your certificate
			</h2>
			<div className="border border-gray-400 mb-4 p-4 rounded-lg}}">
				<h3 className="mb-2">Question</h3>
				<p className="">Your Answered:</p>
				<p className="mt-3">Correct Answer:</p>
			</div>
		</>
	);
};

export default AnswerList;
