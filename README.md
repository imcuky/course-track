# CourseTrack: A Multilingual Academic Task Management System

CourseTrack is a comprehensive web application that helps students manage their academic assignments and schedule through an intuitive interface. The application provides real-time tracking of assignments, calendar-based event planning, and smart notifications in multiple languages (English and French).

The system enables students to create, track, and update assignments with detailed information including due dates, course names, and completion status. It features a calendar view for visualizing deadlines and events, along with a notification center that highlights upcoming and overdue tasks. The multilingual support ensures accessibility for both English and French-speaking users, making it ideal for diverse academic environments.

## Repository Structure
```
.
├── Dockerfile                 # Container configuration for deployment
├── package.json              # Node.js project configuration and dependencies
├── backend/                  # Backend server implementation
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server and API endpoints
├── frontend/                 # Frontend React application
│   ├── translations/    # Internationalization files (EN/FR)
│   ├── AssignmentDashboard.js    # Assignment management interface
│   ├── CalendarView.js           # Calendar visualization component
│   ├── NotificationCenter.js     # Notification management system
│   ├── TaskCard.js              # Reusable assignment card component
│   ├── ConnectedApp.js          # Main application router and layout
│   └── Context.js               # Application state management
├── public/              # Static assets and HTML entry point
└── docs/                    # Documentation and infrastructure diagrams
```

## Usage Instructions
### Prerequisites
- Node.js 14 or higher
- npm package manager
- MongoDB (running on localhost:27017)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd coursetrack

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

```
Setup MongoDB database 'course-track'
```bash

# Start the backend server
cd ../backend
node server.js

# Run the App
npm start

```
