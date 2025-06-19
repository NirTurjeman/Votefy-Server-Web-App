# Votefy

**Votefy** is a full-stack voting system designed for flexibility and integration.

It consists of:
- 🗳️ A backend server (NestJS + Prisma)
- 📊 A web-based admin dashboard (React + Tailwind)
- 📱 A mobile app (Kotlin)
- 📦 A Kotlin SDK for client integration ([see SDK repo](https://github.com/NirTurjeman/Votefy-SDK))


## Project Structure

```
Votefy/
├── Server/         # NestJS backend API and database
├── Web/            # Admin dashboard built with React and Vite
└── App/            # Mobile voting app (Android)
```

## Features

- Create and manage polls (open or multiple-choice)
- Restrict voting by eligible users (optional)
- Real-time vote tracking and visual analytics
- Admin dashboard to control votes and view results
- Mobile app for users to participate in polls easily

## Technologies Used

- **Backend:** NestJS, TypeScript, Prisma, PostgreSQL
- **Web:** React, Vite, TypeScript
- **Mobile:** Kotlin (Android)

## Setup

Each part of the project has its own README with setup instructions:

- [`Server/README.md`](./Server/README.md)
- [`Web/README.md`](./Web/README.md)
- [`App/README.md`](./App/README.md)
