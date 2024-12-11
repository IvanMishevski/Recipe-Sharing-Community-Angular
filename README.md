## Link and  Setting Up the Backend REST API

git clone [Rest-Api](https://github.com/IvanMishevski/Rest-api) or 
download the Rest-Api at (https://github.com/IvanMishevski/Rest-api), use `npm install` and then `npm start`.
The API server will run on \`http://localhost:5000\`

> Note: Make sure MongoDB is installed and running on your system before starting the API server.

# Recipe Sharing Community

A modern web application built with Angular that allows users to share and discover recipes.

## Technologies Used

- **Frontend Framework**: Angular (Standalone Components)
- **Form Handling**: Angular Forms (Template-driven and Reactive)
- **Routing**: Angular Router
- **Date Handling**: Moment.js
- **HTTP Communication**: Angular HttpClient
- **State Management**: Services with RxJS

## Key Features

- User Authentication (Register/Login/Logout)
- Profile Management
- Recipe CRUD Operations
- Recipe Subscription System
- Comments on Recipes
- Error Handling
- Custom Pipes for Text Formatting and Time Display

## Project Structure

- \`src/app/\`
  - \`core/\` - Core components (Header, Footer, Error handling)
  - \`user/\` - User-related components and services
  - \`recipes/\` - Recipe-related components
  - \`shared/\` - Shared components, pipes
  - \`utils/\` - Validators and utilities
  - \`types/\` - TypeScript interfaces

## Getting Started

1. Clone the repository
\`\`\`bash
git clone [repository-url]
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
ng serve
\`\`\`

4. Navigate to \`http://localhost:4200/\`

Make sure you have installed Angular CLI globally.
`npm install -g @angular/cli`


## Environment Setup

Both the frontend and backend servers need to run simultaneously:
- Frontend: \`http://localhost:4200\`
- Backend: \`http://localhost:5000\`

## Main Features

### User Management
- User registration with email validation
- Profile editing
- Authentication state management

### Recipe Management
- Create new recipes
- View recipe catalog
- Detailed recipe view
- Delete recipes (owner only)
- Subscribe to recipes
- Comment on recipes

### Additional Features
- Responsive design
- Custom form validators
- Loading states
- Error message handling
- Time elapsed pipe
- Text slicing pipe

## Architecture

The application follows Angular's recommended practices:
- Standalone components for better modularity
- Service-based state management
- Route guards for protected routes
- Reactive and Template-driven forms
- Custom validators and pipes
- Observable-based data handling"


