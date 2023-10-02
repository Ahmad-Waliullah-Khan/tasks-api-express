# Task Management API

This Node.js Express API allows you to manage tasks, including creating, updating, and retrieving tasks, as well as obtaining task metrics. The project uses a MySQL database to store task data.

## Getting Started

Follow the instructions below to set up and run the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MySQL Database

### Installation

1. Clone this repository to your local machine:

   ```
   git clone <repository_url>
   ```

Navigate to the project directory:
cd task-management-api


Install project dependencies:
```
npm install
```


### Database Setup

Create a MySQL database for the project.

Update database credentials:

Add the following database credentials in config/database.js file.

### Running the Development Server

Start the development server:

```
npm run dev
```


The server will run at http://localhost:3000

### Running Unit Tests


Run unit tests using Mocha:

```
npm test
```


### Project Structure


The project is structured as follows:

- app.js: Entry point for the Express application.
- controllers/: Contains route controllers for handling HTTP requests.
- routes/: Defines API routes and connects them to controllers.
- models/: Defines the database schema and models using Sequelize.
- config/: Contains database configuration.
- test/: Contains unit tests for API endpoints.


### API Endpoints


Create a Task
Endpoint: POST /tasks
Request Body:
```
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "open"
}
```

Response (Example):
```
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "status": "open",
  "createdAt": "2023-10-03T12:00:00.000Z",
  "updatedAt": "2023-10-03T12:00:00.000Z"
}
```

Update a Task
Endpoint: PUT /tasks/:id
Request Body:
```
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "completed"
}
```

Response (Example):
```
{
  "id": 1,
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "completed",
  "createdAt": "2023-10-03T12:00:00.000Z",
  "updatedAt": "2023-10-03T14:00:00.000Z"
}
```


Get All Tasks (Paginated)
Endpoint: GET /tasks
Query Parameters:
page: Page number (default: 1)
pageSize: Number of tasks per page (default: 10)
Response (Example):
```
[
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description 1",
    "status": "open"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description 2",
    "status": "inprogress"
  }
]
```

Get Task Metrics
Endpoint: GET /tasks/metrics
Query Parameters:
type: "status" (default) or "timeline"
Response (Example - status metrics):

```
{
  "open_tasks": 10,
  "inprogress_tasks": 5,
  "completed_tasks": 20
}
```

Response (Example - timeline metrics):

```
[
  {
    "date": "July 2023",
    "metrics": {
      "open_tasks": 0,
      "inprogress_tasks": 5,
      "completed_tasks": 10
    }
  },
  {
    "date": "August 2023",
    "metrics": {
      "open_tasks": 10,
      "inprogress_tasks": 0,
      "completed_tasks": 15
    }
  }
]
```
