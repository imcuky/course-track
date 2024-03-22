import React from "react";
import { useAssignmentsContext, useEventsContext } from "./Context";
import { FormattedMessage } from "react-intl";

const NotificationCenter = () => {
	const { assignments } = useAssignmentsContext();
	const { events } = useEventsContext();

	// Get assignments due within the next 7 days
	const next7Days = new Date();

	next7Days.setDate(next7Days.getDate() + 7);

	const assignmentsDueNext7Days = assignments.filter(
		(assignment) =>
			new Date() < new Date(assignment.dueDate) &&
			new Date(assignment.dueDate) <= next7Days &&
			!assignment.completed
	);

	// Get overdue and incomplete assignments
	const overdueIncompleteAssignments = assignments.filter(
		(assignment) =>
			new Date(assignment.dueDate) < new Date() && !assignment.completed
	);

	// Get upcoming events (within next 7 days)
	const upcomingEvents = events.filter(
		(event) => new Date(event.start) <= next7Days
	);

	return (
		<>
			<h2>
				<FormattedMessage id="notif_center"></FormattedMessage>
			</h2>
			<h3 className="mb-3">
				<FormattedMessage id="upcoming_ass"></FormattedMessage>
			</h3>
			<div className="upcoming-assessments">
				<ul className="list-group mb-4">
					{assignmentsDueNext7Days.length > 0 &&
						assignmentsDueNext7Days.map((assignment) => (
							<li key={assignment.id} className="list-group-item">
								{assignment.title} -{" "}
								{new Date(
									assignment.dueDate
								).toLocaleDateString()}
							</li>
						))}

					{assignmentsDueNext7Days.length === 0 && (
						<div className="no-data">
							<p>
								<FormattedMessage id="no_upcoming_ass"></FormattedMessage>
							</p>
						</div>
					)}
				</ul>
			</div>
			<h3 className="mb-3">
				<FormattedMessage id="upcoming_events"></FormattedMessage>
			</h3>
			{upcomingEvents.length > 0 && (
				<div className="upcoming-events">
					<ul className="list-group mb-4">
						{upcomingEvents.map((event) => (
							<li key={event.id} className="list-group-item">
								{event.title} :{" "}
								{event.start.toLocaleDateString()}{" "}
								{event.startTime} - {event.endTime}
							</li>
						))}
					</ul>
				</div>
			)}

			{upcomingEvents.length === 0 && (
				<div className="no-data">
					<p>
						<FormattedMessage id="no_upcoming_events"></FormattedMessage>
					</p>
				</div>
			)}
			<h3 className="mb-3">
				<FormattedMessage id="overd_incomp_ass"></FormattedMessage>
			</h3>
			{overdueIncompleteAssignments.length > 0 && (
				<div className="overdue-incomplete-assignments">
					<ul className="list-group mb-4">
						{overdueIncompleteAssignments.map((assignment) => (
							<li
								key={assignment.id}
								className="list-group-item text-danger"
							>
								{assignment.title} -{" "}
								{new Date(
									assignment.dueDate
								).toLocaleDateString()}
							</li>
						))}
					</ul>
				</div>
			)}

			{overdueIncompleteAssignments.length === 0 && (
				<div className="no-data">
					<p>
						<FormattedMessage id="no_overd_incomp_ass"></FormattedMessage>
					</p>
				</div>
			)}
		</>
	);
};

export default NotificationCenter;
