
```markdown
# E-Commerce Platform

# Project Setup Guide
This guide will help you set up and run the project locally. The project consists of two main components:


## Overview
This E-Commerce platform is designed to manage an online store efficiently. It consists of three main components: `admin`, `user`, and `server`. The platform leverages Node.js for its runtime environment and MongoDB for its database.

## Prerequisites
Before you begin, ensure you have the following software installed on your system:
- Node.js (v20.14.0) (tested thoroughly with this version)
- npm (comes with Node.js)
- MongoDB (Make sure it's running locally for development purposes)

## Directory Structure
- `/admin` - Contains the administrative dashboard for managing the platform.
- `/user` - Hosts the user interface for customer interactions with the e-commerce store.
- `/server` - Manages server-side operations, including API endpoints and database interactions.

## Installation

### Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/NarjishaK/E-Commerce
cd E-Commerce
```

### Setup Admin Panel
Navigate to the admin directory and install dependencies:
```bash
cd admin
npm install react-scripts@4.0.3 --legacy-peer-deps
npm start
```

### Setup User Interface
Navigate to the user directory and install dependencies:
```bash
cd ../user
npm install --legacy-peer-deps
npm start
```

### Setup Server
Navigate to the server directory and install dependencies:
```bash
cd ../server
npm install
npm start
```

## MongoDB Connection

Ensure MongoDB is running. The application connects to MongoDB using the MongoDB URI `mongodb://0.0.0.0:27017/Electronics`. Please make sure this connection string is configured properly in your environment settings.

## Running the Platform
Ensure all parts of the application are started as per the instructions above. The user and admin interfaces will be available on `http://localhost:3000/` by default, but check the terminal for the exact port numbers.

## Contributing
Contributions to this project are welcome! Please fork the repository and submit pull requests, or create issues for bugs and feature suggestions.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This revised version provides a streamlined guide, focusing on setup instructions without including the JavaScript code block, keeping the document concise and to the point.