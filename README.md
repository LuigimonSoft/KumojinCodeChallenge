# Kumojin Challenge

This is the Kumojin Challenge project, which consists of a complete application with a backend and a frontend. The backend provides an API to manage events, while the frontend is a SPA that consumes this API and allows users to interact with the events.

## Table of Contents
1. [Project Description](#project-description)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Documentation](#documentation)

## Project Description

The goal of this project is to create an application that allows managing events. Users can create new events, view details of existing events, search for events by name, and display all events in a table.

## Technologies Used

- **Backend**: Node.js, TypeScript, Express
- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Database**: Simulated using an array in the repository layer of the backend

## Project Structure

The project is divided into two main parts:

- **Backend**: Provides an API to manage events.
- **Frontend**: A SPA that consumes the backend API.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/LuigimonSoft/kumojin-challenge.git
   cd kumojin-challenge
   ```
2. Install backend dependencies:
    ```sh
    npm install
    ```
3. Install frontend dependencies:
    ```sh
    cd ../frontend
    npm install
    ```
### Running the Application
    ```sh
    npm start
    ```
### Debugging
1. Debug the backend
    ```sh
    npm run dev
    ```
2. Debug the frontend
    ```sh
    cd frontend
    npm run dev
    ```
## Documentation

- [Backend Documentation](documentation/backend.md)
- [Frontend Documentation](documentation/frontend.md)
