import { useState, useEffect, Fragment, useContext } from "react";
import Popup from "reactjs-popup";
import TaskCard from "./TaskCard";
import Event from "./EventEmitter";
import { FormattedMessage, useIntl } from "react-intl";
import { useAssignmentsContext, useEventsContext } from "./Context";
import axios from 'axios';

const AssignmentDashboard = () => {
	const [newAssignmentTitle, setNewAssignmentTitle] = useState("");
	const [newAssignmentDueDate, setNewAssignmentDueDate] = useState("");
	const [newAssignmentCourse, setNewAssignmentCourse] = useState("");
	const [newAssignmentType, setNewAssignmentType] = useState("");
	const [newAssignmentDetail, setNewAssignmentDetail] = useState("");
	let { assignments, setAssignments } = useAssignmentsContext();

	const intl = useIntl();

	const resetForm = () => {
		setNewAssignmentTitle("");
		setNewAssignmentDueDate("");
		setNewAssignmentCourse("");
		setNewAssignmentType("");
		setNewAssignmentDetail("");
	};


	const handleDueDateChange = async (assignmentId, newDueDate) => {
        try {

            await axios.put(`http://localhost:5000/api/assignments/${assignmentId}`, { dueDate: newDueDate });

            setAssignments((prevAssignments) =>
                prevAssignments.map((assignment) =>
                    assignment._id === assignmentId
                        ? { ...assignment, dueDate: newDueDate }
                        : assignment
                )
            );
        } catch (error) {
            console.error('Error updating due date:', error);
            alert(intl.formatMessage({ id: "ass_update_error" }));
        }
    };


	const handleStatusChange = async (assignment) => {
        try {
            
            await axios.put(`http://localhost:5000/api/assignments/${assignment._id}`, { completed: !assignment.completed });

            
            setAssignments((prevAssignments) =>
                prevAssignments.map((a) =>
                    a._id === assignment._id ? { ...a, completed: !a.completed } : a
                )
            );
        } catch (error) {
            console.error('Error updating assignment status:', error);
            alert(intl.formatMessage({ id: "ass_update_error" }));
        }
    };
	const handleAddAssignment = async () => {
        if (
            newAssignmentTitle.trim() !== "" &&
            newAssignmentDueDate.trim() !== "" &&
            newAssignmentCourse.trim() !== "" &&
            newAssignmentType.trim() !== ""
        ) {
            const newAssignment = {
                title: newAssignmentTitle,
                dueDate: newAssignmentDueDate,
                course: newAssignmentCourse,
                type: newAssignmentType,
                detail: newAssignmentDetail,
                completed: false,
            };

            try {
                const response = await axios.post('http://localhost:5000/api/assignments', newAssignment);
                const addedAssignment = response.data;
				console.log(addedAssignment)
                setAssignments((prevAssignments) => [
                    ...prevAssignments,
                    addedAssignment
                ]);
                resetForm(); 
                alert(intl.formatMessage({ id: "ass_add_succ" }));
            } catch (error) {
                console.error('Error adding assignment:', error);
                alert('Failed to add assignment. Please try again.');
            }
        } else {
            alert(
                intl.formatMessage({ id: "ass_add_missing_req_fields" })
            );
        }
    };

    const editedAssignment = async (assignment) => {
        try {

            await axios.put(`http://localhost:5000/api/assignments/${assignment._id}`, {
                title: assignment.title,
                course: assignment.course,
                type: assignment.type,
                detail: assignment.detail
            });


            setAssignments((prevAssignments) =>
                prevAssignments.map((a) =>
                    a._id === assignment._id
                        ? {
                            ...a,
                            title: assignment.title,
                            course: assignment.course,
                            type: assignment.type,
                            detail: assignment.detail,
                        }
                        : a
                )
            );
            alert(intl.formatMessage({ id: "ass_update_succ" }));
        } catch (error) {
            console.error('Error editing assignment:', error);
            alert(intl.formatMessage({ id: "ass_update_error" }));
        }
    };

	useEffect(() => {
		Event.on("assignmentStatusChanged", handleStatusChange);
		Event.on("assignmentDueDateChanged", handleDueDateChange);
		Event.on("editAssignment", editedAssignment);
		return () => {
			Event.off("assignmentStatusChanged");
			Event.off("assignmentDueDateChanged");
			Event.off("editAssignment");
		};
	}, []);

	return (
		<Fragment>
			<h2>
				<FormattedMessage id="ass_dashboard"></FormattedMessage>
			</h2>
			<Popup
				trigger={
					<button className="btn btn-primary">
						<FormattedMessage id="add_new_ass"></FormattedMessage>
					</button>
				}
				modal
				closeOnDocumentClick={false}
				contentStyle={{
					maxWidth: "600px",
					padding: "20px",
					borderRadius: "10px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
					backgroundColor: "#f0f0f0",
				}}
			>
				{(close) => (
					<div className="popup-content p-4">
						<h3>
							<FormattedMessage id="add_new_ass"></FormattedMessage>
							t
						</h3>
						<input
							type="text"
							className="form-control mb-3"
							placeholder={
								
								intl.formatMessage({ id: "ass_title"})
							}
							value={newAssignmentTitle}
							onChange={(e) =>
								setNewAssignmentTitle(e.target.value)
							}
							required
						/>
						<input
							type="date"
							className="form-control mb-3"
							value={newAssignmentDueDate}
							onChange={(e) =>
								setNewAssignmentDueDate(e.target.value)
							}
							required
						/>
						<input
							type="text"
							className="form-control mb-3"
							placeholder={
								
								intl.formatMessage({ id: "course"})
							}
							value={newAssignmentCourse}
							onChange={(e) =>
								setNewAssignmentCourse(e.target.value)
							}
							required
						/>
						<input
							type="text"
							className="form-control mb-3"
							placeholder={
								
								intl.formatMessage({ id: "task_type"})
							}
							value={newAssignmentType}
							onChange={(e) =>
								setNewAssignmentType(e.target.value)
							}
							required
						/>
						<textarea
							className="form-control mb-3"
							placeholder={
								
								intl.formatMessage({ id: "task_detail"})
							}
							value={newAssignmentDetail}
							onChange={(e) =>
								setNewAssignmentDetail(e.target.value)
							}
						/>
						<div className="text-center">
							<button
								className="btn btn-primary me-2"
								type="submit"
								onClick={() => {
									// Save logic goes here
									handleAddAssignment();
								}}
							>
								<FormattedMessage id="add" />
							</button>
							<button
								className="btn btn-secondary"
								onClick={() => {
									close();
									resetForm(); // Reset the form on cancel as well
								}}
							>
								<FormattedMessage id="cancel" ></FormattedMessage>
							</button>
						</div>
					</div>
				)}
			</Popup>

			<div className="dashboard-card-container">
				{assignments.map((assignment) => (
					<TaskCard key={assignment.id} assignment={assignment} />
				))}
			</div>
		</Fragment>
	);
};

export default AssignmentDashboard;
