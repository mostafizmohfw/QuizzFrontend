import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AnswerList from "../Answer/AnswerList";
import CategoryList from "../categories/CategoryList";
import CategoryQuestions from "../categories/CategoryQuestions";
import Master from "../layouts/Master";
import QuestionList from "../questions/QuestionList";

const ProjectRouter = createBrowserRouter([
	{
		path: "/",
		element: <Master />,
		children: [
			{
				path: "/",
				element: <CategoryList />,
			},
			{
				path: "/categories",
				element: <CategoryList />,
			},
			{
				path: "/category-question/:id",
				element: <CategoryQuestions />,
			},
			{
				path: "/exam",
				element: <QuestionList />,
			},
			{
				path: "/result",
				element: <AnswerList />,
			},
		],
	},
]);

export default ProjectRouter;
