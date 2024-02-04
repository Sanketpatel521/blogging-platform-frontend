# Blogging Platform Frontend

The Blogging Platform Frontend is a React application that serves as the user interface for the blogging platform. It interacts with the Blogging Platform Backend to provide a seamless experience for users.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- Node.js
- npm

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sanketpatel521/blogging-platform-frontend.git
   ```
2. **Navigate to the project directory:**

   ```bash
   cd blogging-platform-frontend
   ```
3. **Install dependencies:**

   ```bash
   npm i
   ```
4. **Create a .env file in the project root:**

   ```bash
    REACT_APP_API_BASE_URL=http://localhost:4000 (URL of the Blogging Platform Backend)
   ```

## Running the Application
**Start the application:**
   ```bash
   npm run start
   ```
   - The frontend application will be available at http://localhost:3000
## Run Tests
**Run all test cases:**
   ```bash
   npm run test
   ```

## Important Design Decisions
1. **State Management Libraries:**
This application uses Zustand for state management. Zustand is a simple and efficient state management library for React applications.

2. **Store Architecture:**
  The application is designed with two distinct stores, each responsible for managing specific aspects of the global state.

   1. useUserStore
        This store manages user-related state, including authentication, user profiles, and error handling.

        - Features:
          - User Authentication:
      
            - register: Register a new user and receive a JWT token.
            - login: Log in and receive a JWT token.
            - logout: Log out and clear the user authentication state.
          - User Profile:
            - fetchUserDetails: Fetch the user's details.
            - updateProfile: Update user details.
          - Error Handling:
              Handles errors related to user actions and provides error messages.
            
    2. usePostStore
        This store manages state-related to posts, including post creation, retrieval, updating, and deletion.

         - Features:
           - Post Actions:
               - createPost: Create a new post.
               - fetchPosts: Fetch the latest posts with pagination support.
               - updatePost: Update an existing post.
               - deletePost: Delete a post.
           - Pagination:
                 Manages state variables for pagination, such as the current page, page size, and whether there are more posts to fetch (hasMore).
           - Error Handling:
                 Handles errors related to post actions and provides error messages.
      3. Blog Editor with Draft.js
The Blogging Platform's frontend incorporates Draft.js, a powerful and extensible JavaScript library for building rich text editors. Draft.js is maintained by Facebook and provides a flexible framework for creating customizable and feature-rich text editing experiences.
