# Sorority Web-App

Welcome to the Sorority App! This project is a web application designed to streamline event management and enhance community engagement for sorority members. Users can RSVP to events, manage profiles, and interact dynamically with a user-friendly interface.

---

## Features

- **User Authentication**: Secure login and registration with password hashing.
- **Event Management**: Create, view, and RSVP to events.
- **Dynamic Styling**: Individualized page layouts with reusable styles and dynamic footers.
- **Cloudinary Integration**: Upload and manage event images seamlessly.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Tech Stack

- **Frontend**: Next.js (React Framework)
- **Backend**: Node.js with REST API
- **Database**: PostgreSQL
- **Styling**: CSS Modules with dynamic styles and variables
- **Image Hosting**: Cloudinary
- **Validation**: Zod schema for data validation

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/) account (for image uploads)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sorority-app.git
   cd sorority-app


2. Install dependencies:

```bash
npm install


3. Set up your environment variables: Create a .env file in the root directory and include:



```.env
DATABASE_URL=your_database_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


4. Run database migrations:
```bash
npx prisma migrate dev

5. Start the development server:
```bash
npm run dev
Visit http://localhost:3000 to view the app.

---

### API Routes
User Routes
POST /api/users - Create a new user
GET /api/users/:id - Retrieve user data
Event Routes
POST /api/events - Create a new event
GET /api/events - List all events
GET /api/events/:id - Get event details

---

### Contribution Guidelines
1. Fork the repository and create your branch:
```bash
git checkout -b feature/your-feature-name

2. Commit your changes:
```bash
git commit -m "Add your message"

3. Push to your fork:
```bash
git push origin feature/your-feature-name

4. Open a pull request.

---

### Roadmap
Add support for event comments.
Implement user profile editing.
Integrate real-time notifications for event updates.
License
This project is licensed under the MIT License. See the LICENSE file for details.

---

###Acknowledgements
Cloudinary for image management.
UpLeveled for guidance and resources.
All contributors for their efforts and ideas.
Made with ❤️ by Sara El Abed and contributors.
