# Project 2: Snippet API

## Live Deployment
Live: https://project2-snippetapi.onrender.com/

## Video link and timestamps
Link on Sharepoint: https://laureauas-my.sharepoint.com/:v:/g/personal/esp00002_laurea_fi/IQA6D4mBJu_4TZ0gzsp32awFAckiPtiGLH7h3rUmD9uU3XI?e=dU4PdY&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbFZpZXciOiJTaGFyZURpYWxvZy1MaW5rIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXcifX0%3D

Timestamps:
00:00 Introduction
00:13 Server Running
00:25 Test: GET all snippets
00:45 Test: POST a new snippet
00:58 Test: UPDATE the created snippet
01:22 Test: GET by language FILTER
01:43 Test: DELETE the snippet
02:07 Final Words

## Run Locally

### Setup Instructions
npm install // Installs all project dependencies defined in the package.json file.
npm start // Executes the "start" script defined in package.json (e.g., node server.js).
Open http://localhost:3000/ // Instructs the user where to access the application in their browser.

## Features
- Create new snippets
- Update snippets
- List created snippets, also with filters (e.g., by language)
- Delete snippets

## Windows and macOS Notes
Open VS Code terminal. The commands are the same on both platforms.

## Reflection
(Around ~230 words in total)
For the second project, I followed once again the step-by-step tutorial provided by the teacher to build the Snippet API. Afterwards I added the required last routes to the code, which were for filtering and updating the snippets.
The goal was to create a small but yet functional back-end service using Node.js, Express, MongoDB and Mongoose.
The API itself allows users to store code snippets, retrieve them, filter them by e.g., language, update them and delete them.

By writing out the code and carefully following each step, I learned how a back-end API is structured and how different parts of the system work together in harmony.
I gained once again a better understanding of how to set up an Express server, how to define routes, etc.
Working with MongoDB in a project also taught me how data gets validated and how different quaries are performed for different operations, such as filtering or updating.
Testing the API using curl helped me understand how requests are formed and how the server responds to them.

If I were to expand this project as well further, I'd probably build a small front-end interface that allows users to view, search and edit snippets visually instead of only throuigh curl commands.
But overall I gained a better strength in the fundamentals of back-end development and I got a clearer picture of how APIs communicate with databases and clients.

## Self Assesment
Core Functionality (6/6):
All required CRUD features for the Snippet API have been implemented in the code.
The API supports creating new snippets, retrieving all snippets, filtering them by language, fetching a single snippet by ID, updating existing entries and deleting snippets.
All endpoints functioned correctly when I tested them with curl, and the MongoDB connection should work without issues.

Code Quality and Architecture (2/2):
The project is structured clearly with middleware, database setup and routes grouped in an organized manner.
Naming conventions are consistent and logical.
The seperation into sections makes the code readable and easy to follow.

UX, Accessibility and Data Handling (4/5):
Since this is a back-end-focused project, UX might refer to how intuitive and consistent the API is to use.
Routes follow predictable patterns, return clean JSON and provide clear error messages for requests that are invalid.
Environ variables are used correctly. The API is accessible through tools such as curl, though there's no graphical UI.

Documentation (2/3):
This README contains the basic setup instructions, environment variable information, self-assesment, learning reflection and everything else except screenshots.

Deployment (2/2):
The API should be deployed successfully on Render with a link to it attached on this README.
The base route responds correctly and no exposed secrets are in the deployed version.

Demo Video (1/2):
The video demonstrates the basics of running the server and using the CRUD routes.
It meets the required length, but I wasn't completely sure if it meets the required content.

So in total 17/20.
