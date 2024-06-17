## Documentation for "Kumojin Challenge FrontEnd"

### Table of Contents
1. [Project Name](#1-project-name)
2. [General Description](#2-general-description)
3. [Technologies Used](#3-technologies-used)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Main Components and Their Functionality](#5-main-components-and-their-functionality)
6. [Workflow and Navigation](#6-workflow-and-navigation)
7. [State Management](#7-state-management)
8. [Details on Backend Integration](#8-details-on-backend-integration)
9. [Deployment and Suggested Tools](#9-deployment-and-suggested-tools)
10. [Security](#10-security)
11. [Visual Examples of Components](#11-visual-examples-of-components)

### 1. Project Name
**Kumojin Challenge FrontEnd**

### 2. General Description
"Kumojin Challenge FrontEnd" is a SPA (Single Page Application) that consumes the API created in the backend. It allows users to display all events in a table, view event details, search for events by name, and create new events.

### 3. Technologies Used
- **Main Framework**: React with Vite
- **Programming Language**: TypeScript
- **Responsive Design**: Tailwind CSS

### 4. Frontend Architecture
The frontend architecture is based on components to facilitate the distribution and maintenance of each part of the application. A service has been created for consuming the API.

### 5. Main Components and Their Functionality
1. **Event Table**: Main component that displays a table with all events.
2. **Table Rows**: Component to represent each row in the event table.
3. **Event Form**: Component used to view the details of an existing event or create a new event.

### 6. Workflow and Navigation
- **Home Page**: When the application loads, all events are fetched using the `/events` endpoint via GET method and displayed in a table.
- **View Details**: Clicking on an event in the table shows the event details in the form.
- **Search by Name**: Functionality to search for events by name using a search field. The `/events/:name` endpoint is consumed to perform the search and the found event is displayed.
- **Create New Event**: Functionality to create a new event using the form. The `/events` endpoint is used via the POST method to create the event.

### 7. State Management
`useState` from React is used for state management, as no more advanced state management is required for this application.

### 8. Details on Backend Integration
- **API Service**: A service has been created to handle requests to the backend API, including operations to get all events, search for events by name, and create new events.
- **API Consumption**: The components use this service to interact with the API and manage event data.

### 9. Deployment and Suggested Tools
- **Deployment**: Vercel or Netlify is suggested for deploying the application due to their integration with Vite and ease of use.
- **CI/CD**: It is recommended to configure GitHub Actions to handle continuous integration and delivery, ensuring that every code change is deployed automatically.

### 10. Security
- **Security**: Currently, the application does not have security implemented. It is recommended to implement HTTPS for communications and consider authentication and authorization measures in future versions.

### 11. Visual Examples of Components

#### 11.1. Event Table
```plaintext
+-------------------------------------------------------------------------+
|                           Event List                                    |
+-------------------------------------------------------------------------+
| Event Name             | Description               | Start Date     |  |
|------------------------|---------------------------|----------------|--|
| Annual Conference      | Conference on IT          | 01/07/2024     | [View] |
| Innovation Seminar     | Industrial Innovations    | 15/08/2024     | [View] |
| Development Workshop   | Web Development Workshop  | 10/09/2024     | [View] |
+-------------------------------------------------------------------------+
```
#### 11.2. Table Rows
```plaintext
| Annual Conference      | Conference on IT          | 01/07/2024     | [View] |
```
#### 11.3. Event Form
```plaintext
+--------------------------------------------------+
|                  Event Details                   |
+--------------------------------------------------+
| Event Name:        [__________________________]  |
| Description:       [__________________________]  |
| Start Date:        [______/______/______]        |
| End Date:          [______/______/______]        |
+--------------------------------------------------+
| [Save] [Cancel]                                  |
+--------------------------------------------------+
```
