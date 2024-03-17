import Card from "react-bootstrap/Card";

const TaskCard = (props) => {
  const { id, title, dueDate, course, type, detail, completed } = props.assignment;

  return (
    <Card className="task-card">
      <Card.Body>
        <Card.Title>{course}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <Card.Text>{title}</Card.Text>
        <div className="completed-checkbox">
          <input
            type="checkbox"
            id={`completed-${id}`}
            checked={completed}
            onChange={() => {
              Event.emit("assignmentStatusChanged", props.assignment);
            }}
          />
          <label htmlFor={`completed-${id}`}>Completed</label>
        </div>
        <input type="date" value={dueDate} />
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
