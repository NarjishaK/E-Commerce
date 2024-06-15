
# Project Setup Guide
This guide will help you set up and run the project locally. The project consists of two main components:

## Overview
This E-Commerce platform is designed to manage an online store efficiently. It consists of three main components: `admin`, `user`, and `server`. The platform leverages Node.js for its runtime environment and MongoDB for its database.

- Admin: A Nest.js API running on port 3000.
- user: A Nest.js API running on port 3000.
- Server: An Express.js server running on port 8080.
- Database: MongoDB running on its default port.

## Prerequisites
Before you begin, ensure you have the following software installed on your system:
- Node.js (v20.14.0) (tested thoroughly with this version)
- npm (comes with Node.js)
- MongoDB (Make sure it's running locally for development purposes)

## Directory structure
- `/admin` - Contains the administrative dashboard for managing the platform.
- `/user` - Hosts the user interface for customer interactions with the e-commerce store.
- `/server` - Manages server-side operations, including API endpoints and database interactions.

## Setup Instructions
1. **Clone the Repository**

    ```bash
    git clone https://github.com/NarjishaK/E-Commerce
    cd E-Commerce
    ```

2. **Setup Admin**

    Navigate to the admin directory and install dependencies:

    ```bash
    cd Admin
    npm install react-scripts@4.0.3 --legacy-peer-deps
    npm install
    ```

3. **Setup user**

    Navigate to the user directory and install dependencies:

    ```bash
    cd ../user
    npm install --legacy-peer-deps
    npm install
    ```

4. **Setup Server (Express.js)**

    Navigate to the server directory and install dependencies:

    ```bash
    cd ../server
    npm install
    ```

5. **Start MongoDB**

    Ensure MongoDB is running on its default port (27017). If you haven't started it yet, you can do so by running:

    ```bash
    mongod
    ```


    The server will be running on http://localhost:8080.

    The client (Nest.js API) will be running on http://localhost:3000.


## Additional Notes
- **Environment Variables:** Currently, all configuration values (e.g., MongoDB URL) are hardcoded. For a production setup, it is recommended to use environment variables for better security and flexibility.

- **Dependencies:** Make sure all required dependencies are installed and up-to-date.


- If you encounter issues feel free to reach me.

## Feedback
If you have any feedback or suggestions for improvement, please feel free to reach out.

Thank you and happy coding!
