
# React Node Challenge

## Description

Simple note app that can help user to create and update notes.

## Technologies
- React.js
- Node.js
- PostgreSQL

## Features

- User authentication with Login and Register pages
- Profile page where the user can change their first and last names
- Dashboard page displaying a list of Notes
- Add, edit, or delete notes functionality
- Search functionality by note title
- Filter functionality by Created or Updated date

## Installation

To run this project locally, follow the steps below:

### Prerequisites

- Node.js (version 16.14.0)
- NPM (version 8.3.1)

### Clone the Repository

```bash
git clone https://github.com/your-username/your-project.git

To run frontend,
cd your-project
    npm install

cd backend
npm install

**Set Up the Environment Variables**
Create a .env file in the backend directory.

Define the following environment variables in the .env file:

    HOST=your_DB_Host
    USER=DB_Username
    PASSWORD=DB_Password
    DB=DB_Name
    DIALECT=postgres
    DB_PORT=PostgreSQL_Port_Number
    JWTTOKEN=unique_JWT_token

**Start the Development Servers**
**Frontend**
bash
Copy code

    cd frontend
    npm start

    Backend
    bash
    Copy code
    cd backend
    npm start

The React frontend will be accessible at http://localhost:3000, and the Node backend will be running on http://localhost:4000.

