# Votefy Admin Web Portal

This is the admin dashboard for the **Votefy** voting system.

## 🧭 Overview

The portal is built for administrators to manage the entire voting system. It connects directly to the backend and provides full control over the lifecycle of polls and users.

## ✨ Features

- **Authentication:** Secure admin login  
- **Poll Management:**
  - Create new polls (multiple choice / open question)
  - Activate / deactivate polls
  - Delete polls
- **Admin Management:** Add new administrators
- **Analytics Dashboard:**
  - View charts of vote distribution per poll
  - Monitor number of voters
- **Real-time Interaction:** Uses REST API for live updates

## 🛠 Technologies

- **Framework:** React + TypeScript  
- **Styling:** Tailwind CSS  
- **HTTP Client:** Axios  
- **Charts:** Recharts  
- **Build Tool:** Vite  

## 📁 Folder Structure

```
src/
├── components/         # Reusable UI components (charts, tables, etc.)
├── pages/              # Pages like Login, Create Poll, Poll Details
├── services/           # API service layer (e.g., pollService.ts)
├── assets/             # Static assets
├── App.tsx             # Main app component
├── main.tsx            # Entry point
```

## ⚙️ API Configuration

All API requests are centralized in `src/services/api.ts`. Make sure the `baseURL` matches your backend:

```ts
const api = axios.create({
  baseURL: 'http://localhost:3000/votes'
});
```

You can then use helper methods from `pollService.ts` to perform actions like:

```ts
await createPoll(title, type, options);
await activatePoll(pollId);
```

## 🚀 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser at: [http://localhost:5173](http://localhost:5173)

> 💡 Make sure the backend server is running and accessible at the base URL you configured.

## 📦 Production Build

```bash
npm run build
```
## 📹 Web Test Video

- [▶️ Web Test](./Web_Test.mov)

## 🌐 Live Website

You can access the live version of the Votefy web app here:  
👉 [https://votefy-web.onrender.com](https://votefy-web.onrender.com)
- Username: admin
- Password: 123
