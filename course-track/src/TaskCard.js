import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Popup from "reactjs-popup";
import Event from "./EventEmitter";
import { FormattedMessage } from "react-intl";

const TaskCard = (props) => {
	const { id, title, dueDate, course, type, detail, completed } =
		props.assignment;
	const [isOpen, setIsOpen] = useState(false);
	const [editedTitle, setEditedTitle] = useState(title);
	const [editedCourse, setEditedCourse] = useState(course);
	const [editedType, setEditedType] = useState(type);
	const [editedDetail, setEditedDetail] = useState(detail);

	const handleEdit = () => {
		setIsOpen(true);
	};

	const handleSave = () => {
		if (
			editedTitle.trim() !== "" &&
			editedCourse.trim() !== "" &&
			editedType.trim() !== ""
		) {
			const editedAssignment = {
				id,
				title: editedTitle,
				course: editedCourse,
				type: editedType,
				detail: editedDetail,
				completed,
			};

			// Emit event to update assignment details
			Event.emit("editAssignment", editedAssignment);

			// Close the popup and reset state
		} else {
			alert(
				<FormattedMessage id="fill_all_fields_ass_update"></FormattedMessage>
			);
		}
		setEditedTitle(editedTitle);
		setEditedCourse(editedCourse);
		setEditedType(editedType);
		setEditedDetail(editedDetail);
		setIsOpen(false);
	};

	const handleCheckboxClick = (e) => {
		e.stopPropagation(); // Prevent click event propagation to parent elements
	};

	const handleDateClick = (e) => {
		e.stopPropagation(); // Prevent click event propagation to parent elements
	};

	return (
		<>
			<Card className="task-card">
				<Card.Body onClick={handleEdit}>
					<Card.Title>{course}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						{type}
					</Card.Subtitle>
					<Card.Text>{title}</Card.Text>
					<Card.Text>{detail}</Card.Text>
					<div className="completed-checkbox">
						<input
							type="checkbox"
							id={`completed-${id}`}
							checked={completed}
							onChange={() => {
								Event.emit(
									"assignmentStatusChanged",
									props.assignment
								);
							}}
							onClick={handleCheckboxClick} // Prevent click event propagation
						/>
						<label
							htmlFor={`completed-${id}`}
							onClick={handleCheckboxClick}
						>
							<FormattedMessage id="completed"></FormattedMessage>
						</label>
					</div>
					<input
						type="date"
						value={dueDate}
						onChange={(e) => {
							Event.emit(
								"assignmentDueDateChanged",
								props.assignment.id,
								e.target.value
							);
						}}
						onClick={handleDateClick} // Prevent click event propagation
					/>
				</Card.Body>
			</Card>

			<Popup
				open={isOpen}
				onClose={() => setIsOpen(false)}
				contentStyle={{
					maxWidth: "600px",
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					backgroundColor: "#f0f0f0",
				}}
			>
				<div className="popup-content p-4">
					<h3 className="mb-4">
						<FormattedMessage id="edit_ass"></FormattedMessage>
					</h3>
					<input
						type="text"
						className="form-control mb-3"
						placeholder={
							<FormattedMessage id="ass_title"></FormattedMessage>
						}
						value={editedTitle}
						onChange={(e) => setEditedTitle(e.target.value)}
						required
					/>
					<input
						type="text"
						className="form-control mb-3"
						placeholder={
							<FormattedMessage id="course"></FormattedMessage>
						}
						value={editedCourse}
						onChange={(e) => setEditedCourse(e.target.value)}
						required
					/>
					<input
						type="text"
						className="form-control mb-3"
						placeholder={
							<FormattedMessage id="task_type"></FormattedMessage>
						}
						value={editedType}
						onChange={(e) => setEditedType(e.target.value)}
						required
					/>
					<textarea
						className="form-control mb-3"
						placeholder={
							<FormattedMessage id="task_detail"></FormattedMessage>
						}
						value={editedDetail}
						onChange={(e) => setEditedDetail(e.target.value)}
					/>
					<div className="text-center">
						<button
							className="btn btn-primary me-2"
							onClick={handleSave}
						>
							<FormattedMessage id="save"></FormattedMessage>
						</button>
						<button
							className="btn btn-secondary me-2"
							onClick={() => setIsOpen(false)}
						>
							<FormattedMessage id="cancel"></FormattedMessage>
						</button>
					</div>
				</div>
			</Popup>
		</>
	);
};

export default TaskCard;
