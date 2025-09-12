School Directory Web App
This is a full-stack web application built with Next.js and MySQL that allows users to add new schools to a directory and view a list of all submitted schools. The project is designed to be fully responsive, working seamlessly on both desktop and mobile devices.

✨ Live Demo
<!-- Add your Vercel deployment link here after you deploy -->

Link to Live Application

🚀 Features
Homepage: A clean landing page to navigate the application.

Add School Form: A user-friendly, responsive form to submit new school details.

Form Validation: Client-side validation using react-hook-form to ensure data integrity.

School Directory: A responsive, grid-based layout to display all schools, similar to an e-commerce product page.

Backend API: A robust API built with Next.js API Routes to handle data operations (create and read).

Modern UI: Styled with Tailwind CSS for a professional and modern look and feel, including icons from Heroicons.

🛠️ Tech Stack
Framework: Next.js (with App Router)

Language: JavaScript

Styling: Tailwind CSS

Form Management: React Hook Form

API Communication: Axios

Database: MySQL

Database Hosting: Aiven

Deployment: Vercel

Icons: Heroicons

⚙️ Getting Started
Follow these instructions to set up and run the project locally on your machine.

Prerequisites
Node.js (v18 or later)

npm or yarn

A MySQL database (you can use a cloud provider like Aiven or a local instance)

1. Clone the Repository
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a file named .env.local in the root of your project and add the following variables.

# Your MySQL database connection string
DATABASE_URL="mysql://user:password@host:port/database?ssl-mode=REQUIRED"

# The base URL for your local development server
NEXT_PUBLIC_API_URL="http://localhost:3000"

4. Set Up the Database Table
Run the setup script to create the schools table in your database.

node scripts/setup-db.js

5. Run the Development Server
npm run dev

Open http://localhost:3000 in your browser to see the application.







