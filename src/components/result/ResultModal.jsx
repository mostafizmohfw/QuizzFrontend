import React from "react";
import Modal from "react-bootstrap/Modal";

const ResultModal = (props) => {
	console.log(props.questions)
	return (
		<>
			<Modal {...props} size="lg" aria-labelledby="category_details_modal" centered>
				<Modal.Header closeButton>
					<Modal.Title id="category_details_modal">{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h1>{props.score}</h1>
					<h1>
					{/* {props.questions.map((question, index) =>(
							<p key={index}>{++index}. {question.category}</p>
						))} */}
					</h1>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ResultModal;
