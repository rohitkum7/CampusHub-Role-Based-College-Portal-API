# 📚 CampusHub – Role-Based College Portal API

CampusHub is a role-based college portal built using Node.js, Express, Prisma ORM, and PostgreSQL.
It provides a platform for Admins, Faculty, and Students to manage academic activities such as courses, materials, announcements, results, and notifications.

This project also integrates Novu (with Mailtrap) for email notifications.

[Checkout the Postman API Documentation](https://documenter.getpostman.com/view/28983033/2sB3HgQ3VH)

# 🚀 Features

### 🔐 Authentication & Authorization

User registration & login with JWT-based authentication.

Role-based access control:

- Admin: Full control (manage users, roles, announcements, results, courses, materials).

- Faculty: Can create courses, upload materials, create announcements, and send notifications.

- Students: Can view announcements, results, enrolled courses, and receive notifications.

### 📢 Announcements

Admin & Faculty can create announcements.

Students can view announcements relevant to them.

Endpoints:

- POST `/api/v1/announcements/create-announcement` → Create announcement

- GET `/api/v1/announcements/get-announcements` → Fetch all announcements

### 📝 Results Management

Admin & Faculty can publish results for students.

Results automatically link to student details.

Students can fetch their results.

Endpoints:

- POST `/api/v1/results` → Create results

- GET `/api/v1/results/:studentId` → Fetch results for a student

### 📚 Courses & Materials

Courses can be created by Admin/Faculty.

Materials (PDFs, Assignments, Videos, Notes, URLs) can be uploaded to courses.

Students can view course materials.

Endpoints:

- POST `/api/v1/courses` → Create a course

- GET `/api/v1/courses/get-courses` → Fetch all courses

- POST `/api/v1/courses/:courseId/materials` → Add material to a course

- GET `/api/v1/courses/:courseId/materials` → Get materials by course

👨‍🎓 Admin Control

Manage all users in the system.

Update roles (Admin cannot downgrade other Admins).

Endpoints:

- GET `/api/v1/admin/users` → Get all users

- PUT `/api/v1/admin/users/:id/role` → Update user role

📩 Notifications (Email)

Integrated with Novu + Mailtrap for sending emails.

Admins & Faculty can send notifications to students.

Endpoints:

- POST `/api/v1/notifications/` → Send notification (email + in-app message)

### 🛠️ Tech Stack

Backend Framework: Node.js
with Express.js

- Database: PostgreSQL

- ORM: Prisma

- Authentication: JWT (JSON Web Token)

- Email Notifications: Novu

- Mailtrap

- API Testing: Postman

### 📂 Project Modules

- Auth Module → Register, Login, JWT Auth

- Admin Module → Manage users, roles

- Announcements Module → Post & view announcements

- Courses Module → Create courses & materials

- Results Module → Publish and view exam results

- Notifications Module → Email notifications for students

### 🗄️ Database Models

- User → Stores user info & role (Admin, Faculty, Student)

- Course → Contains courses created by Admin/Faculty

- Material → Course materials (PDF, Assignment, Video, Notes)

- Result → Student exam results

- Announcement → News & updates for students

### 🔑 Future Improvements

- Student enrollment in courses

- Assignment submissions & grading system

- Real-time notifications (WebSocket integration)

- Dashboard with analytics for Admin & Faculty

✅ This project is designed to simulate a real-world college portal system, focusing on role-based access, data management, and communication between students, faculty, and admins.
