import React from "react";
import { useAssignmentsContext, useEventsContext } from "./Context";
import { FormattedMessage } from "react-intl";

import { Card, ListGroup } from "react-bootstrap";
import { FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";

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
                <FormattedMessage id="notif_center" />
            </h2>
            {/* upcoming ass */}
            <Card className="mb-4">
                <Card.Header>
                    <FaCalendarAlt className="me-2" />
                    <FormattedMessage id="upcoming_ass" />
                </Card.Header>
                <ListGroup variant="flush">
                    {assignmentsDueNext7Days.length > 0 ? (
                        assignmentsDueNext7Days.map((assignment) => (
                            <ListGroup.Item key={assignment.id}>
                                <span className="fw-bold">{assignment.title}</span> -{" "}
                                {new Date(assignment.dueDate).toLocaleDateString()}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>
                            <FormattedMessage id="no_upcoming_ass" />
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
            {/* upcoming events */}
            <Card className="mb-4">
                <Card.Header>
                    <FaCalendarAlt className="me-2" />
                    <FormattedMessage id="upcoming_events" />
                </Card.Header>
                <ListGroup variant="flush">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
                            <ListGroup.Item key={event.id}>
                                <span className="fw-bold">{event.title}</span> :{" "}
                                {new Date(event.start).toLocaleDateString()} {event.startTime} - {event.endTime}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>
                            <FormattedMessage id="no_upcoming_events" />
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
            {/* over due */}
            <Card>
                <Card.Header className="text-danger">
                    <FaExclamationTriangle className="me-2" />
                    <FormattedMessage id="overd_incomp_ass" />
                </Card.Header>
                <ListGroup variant="flush">
                    {overdueIncompleteAssignments.length > 0 ? (
                        overdueIncompleteAssignments.map((assignment) => (
                            <ListGroup.Item key={assignment.id} className="text-danger">
                                <span className="fw-bold">{assignment.title}</span> -{" "}
                                {new Date(assignment.dueDate).toLocaleDateString()}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>
                            <FormattedMessage id="no_overd_incomp_ass" />
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </>
    );
};

export default NotificationCenter;
