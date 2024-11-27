# Project Management Tool

A MERN stack-based Project Management Tool that allows users to manage tasks, log time, and track productivity effectively. The application provides features like task creation, time tracking, and reporting functionality.

---

## Features

### Frontend
- **Dashboard Overview**: Displays active projects, recent tasks, and a summary of logged time.
- **Task and Project Management**: Create, manage, and organize projects and tasks with due dates, priorities, and statuses.
- **Time Logging**: Track time with a timer or manually log time spent on tasks.
- **Task Prioritization**: Sort and filter tasks by priority, due date, and assigned user.

### Backend
- **API for Task Management**: CRUD operations for projects and tasks with features to assign users and update statuses.
- **Time Log API**: Endpoints for starting/stopping timers and manual time entry.
- **Database Management**: Stores data for projects, tasks, and time logs.

---

## Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Deployment**: Local development setup (can be extended to a hosting platform)

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- npm or Yarn
- MongoDB (local instance or Atlas)
- Git

### Steps to Run Locally

- **Clone the Repository**:
  ```bash
  git clone https://github.com/your-username/project-management-tool.git
  cd project-management-tool


- **Setup and run Frontend**:
cd frontend
npm install
REACT_APP_API_BASE_URL=http://localhost:8080/api
npm start
http://localhost:3000


- **Setup and run Backend**:
cd backend
npm install

update env for backend according to .env.sample

http://localhost:8080



