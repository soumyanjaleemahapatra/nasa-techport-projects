# nasa-techport-projects
This repository contains a web application that allows users to search and explore NASA's TechPort Projects based on their update dates.

## Overview
The NASA TechPort Projects web application provides a user-friendly interface for accessing and exploring a wide range of projects from NASA's TechPort database. It features a clean and user-friendly interface with a date picker, pagination, and detailed project information. Users can search for projects and view detailed information about each project, helping them stay informed about the latest developments in various fields of space exploration and technology.

## Features

- **Search by Date:** Easily search for projects based on the date they were last updated
- **Pagination:** Navigate through a paginated list of projects.
- **Detailed Information:** View detailed information about each project, including description, status, and contributors.

## Technologies Used

- Vue.js (v3)
- Nuxt.js (v3)
- Fetch API for data retrieval
- Vue DatePicker for date selection

[Jump to Getting started](#getting-started)

## Project Architecture

The project follows a component-based architecture. 

The list of components with their main responsibilities is as follows:

### Components

1. **Index.vue:**
   - Renders the initial project list on the server-side.
   - Integrates other components to make searching, pagination, and viewing of project details possible.

2. **LoadingIndicator.vue:**
   - Provides a visual indicator to users during data loading.

3. **ProjectDetails.vue:**
   - Responsible for displaying the details related to a specific project.

4. **ProjectContact.vue:**
   - Responsible for displaying the contact details of some of the contributors to the specific project.

5. **Pagination.vue:**
   - Handles pagination for the project list.

### Key Architecture Decisions

1. **Pagination Strategy:**
   - Utilized a client-side pagination strategy to prevent the frontend from freezing and ensure fast subsequent pagination requests. Also, incorporated the idea of not showing the Pagination component when the total number of results is too few.

2. **State Management:**
   - Used the browser's local storage to persist user preferences such as search date, displayed projects, and page size. Avoided the overhead of a centralized store like Vuex because only a small amount of client-side state is stored.

3. **Third-Party Libraries:**
   - In order to maintain a lightweight and efficient application, the use of third-party libraries is minimized.

4. **Loading Indicator:**
   - Implemented a loading indicator to provide feedback to users when project data is fetched from the API.

5. **Fetching API Data:**
   - To fix the CORS-related issue, attempted various approaches, including creating a proxy server middleware and using Nuxt proxy. The successful approach implemented in the project is based on the discussion in [Nuxt GitHub Discussions](https://github.com/nuxt/nuxt/discussions/15907): Nitro proxy API endpoint.

6. **Displaying Basic Project Data in the Project List:**
   - 'api/projects' doesn't return the start and end dates of the project. Hence, the decision was made to fetch the details of every single project based on the size of the page and then display the list of the projects. Fetching details of all projects in the list at once was avoided to prevent a large number of API requests to '/api/projects/{projectId}'.

7. **Usage of Teleport:**
   - Implemented Teleport by Nuxt to show the details of a project in a popover when the user clicks on it.

### Future Enhancements

1. **Better Coverage of Tests:**
   - Add more unit tests to cover fetching project list and project details successfully, toggling the visibility of the Teleport component, updates on search date changes working as intended, and handling error states properly.

2. **Loading Indicator:**
   - Style it better for improved UX.

3. **Using SASS Instead of Normal CSS:**
   - Currently, scoped styles are added to the components. CSS preprocessors like SASS could be used for an elegant solution.

## Getting Started {#getting-started}

To run the web application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/soumyanjaleemahapatra/nasa-techport-projects.git

2. **Navigate to the project directory:**
    ```bash
    cd nasa-techport-projects

3. **Install the necessary dependencies:**
    ```bash
    npm install

4. **Run the development server:**
    ```bash
    npm run dev

5. **Open the application:**
    Visit http://localhost:3000 in your web browser.

## Running Tests
    npm run test

## Usage
Once the application is running, you can use the date picker to find projects. Clicking on a project will take you to a detailed view with comprehensive information about the selected project.

