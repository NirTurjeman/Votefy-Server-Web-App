# Votefy Server (Backend)

This is the backend service for the **Votefy** voting system.

## Overview

The server provides a REST API for both end users and administrators. It handles authentication, poll management, vote submissions, and analytics.

## Features

- ✅ **Admin authentication**
- 🗳️ **Create and manage polls** (multiple choice & open)
- 📊 **Vote tracking and distribution analytics**
- 🔐 **Eligibility control** (optional per poll)
- 🧾 **Create and manage admin accounts**
- ⚡ Fast and lightweight with NestJS + Prisma

## Technologies

- **Framework:** [NestJS](https://nestjs.com/) (Node.js + TypeScript)
- **ORM:** [Prisma](https://www.prisma.io/) for PostgreSQL
- **Database:** PostgreSQL
- **Environment Config:** `.env` file for secrets and DB credentials

## Folder Structure

- `src/votefy/` – Business logic: controllers, services, and DTOs
- `prisma/` – Schema and migration files for PostgreSQL
- `src/main.ts` – Entry point for the NestJS application
- `tsconfig.json` – TypeScript configuration

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables in `.env`:
   ```
   DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
   ```

3. Apply Prisma schema:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Run the server:
   ```bash
   npm run start
   ```

## Purpose

This backend powers all Votefy clients – the web admin portal and mobile apps – by exposing a structured and secure REST API for managing voting sessions and collecting results.

