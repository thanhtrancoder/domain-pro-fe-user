# Domain Pro — Frontend

A personal project for my portfolio. Domain Pro is a modern web app for domain search, registration, and management.

## Features
- Search domain availability and suggestions
- Add to cart and checkout flow
- User authentication and dashboard
- Manage domains (renewals, DNS settings UI placeholders)
- Responsive UI with Tailwind CSS

## Tech Stack
- React 19 + TypeScript
- Vite 7 for dev/build
- React Router
- Tailwind CSS
- Axios for API calls

## Getting Started
Prerequisites: Node.js 18+ and npm

1. Install dependencies
   ```bash
   npm install
   ```
2. Start development server
   ```bash
   npm run dev
   ```
Project run at http://localhost:3000

## Environment Variables
Create a `.env` file at the project root if needed:
```
VITE_API_BASE_URL=https://your-api.example.com
```

## Project Structure (high level)
```
src/
  api/            # API services (axios)
  components/     # Reusable UI components
  pages/          # Route pages (auth, dashboard, cart, checkout, etc.)
  assets/         # Images, icons
  vite.config.ts  # Vite configuration
```

