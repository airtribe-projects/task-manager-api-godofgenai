# Project Overview

This is a simple task manager service.

# Setup Instruction

git clone https://github.com/airtribe-projects/task-manager-api-godofgenai.git<br>
npm i<br>
npm run start<br>

# Endpoint Details

GET /tasks: Retrieve all tasks.
GET /tasks/:id: Retrieve a specific task by its ID.
POST /tasks: Create a new task with the required fields (title, description, completed).
PUT /tasks/:id: Update an existing task by its ID.
DELETE /tasks/:id: Delete a task by its ID.
