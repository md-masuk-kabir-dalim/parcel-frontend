Frontend README (gym-class-frontend)
Gym Class Frontend
Description
This is the client-side application for the Gym Class Scheduling and Membership Management System. It provides an interactive interface for Admins, Trainers, and Trainees to manage gym operations, schedule classes, and book sessions.

Features
Authentication: Login and registration for trainees, JWT-based authentication for all roles.
Admin Dashboard:
Manage trainers.
Schedule and assign classes.
Trainer Dashboard: View scheduled classes and trainee lists.
Trainee Dashboard: Book available classes and view personal schedule.
Fully responsive and optimized for mobile devices.
Tech Stack
Framework: Next.js
Styling: Tailwind CSS
State Management: Redux Toolkit
Authentication: JWT
Routing: React Router (Next.js built-in)
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/dalim-kazi/gym-class-frontend.git
cd gym-class-frontend
Install dependencies:

bash
Copy code
npm install
Configure environment variables: Create a .env.local file in the root directory and add:

env
Copy code
NEXT_PUBLIC_API_BASE_URL=https://gym-class-server.onrender.com
Run the application:

bash
Copy code
npm run dev
Build for production:

bash
Copy code
npm run build
npm start
Available Scripts
npm run dev: Starts the development server.
npm run build: Builds the production-ready app.
npm start: Runs the built app in production mode.
Folder Structure
bash
Copy code
.

Dependencies
Next.js
Tailwind CSS
Redux Toolkit
Axios
JWT-decode