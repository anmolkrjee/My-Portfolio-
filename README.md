# Anmol Kumar Portfolio - MERN Edition

This project converts the original static portfolio into a dynamic MERN application.

## What changed

- React frontend with an interactive single-page portfolio experience
- Express and MongoDB backend for portfolio content and contact submissions
- Seeded portfolio data so sections are database-driven
- Contact form now stores messages in MongoDB
- Skills can be filtered and projects can be previewed interactively
- Theme toggle for light and dark modes

## Project structure

```text
.
|-- client/        # React + Vite frontend
|-- server/        # Express + MongoDB backend
|-- assets/        # Existing portfolio images and resume
|-- css/           # Legacy static-site CSS kept for reference
|-- index.html     # Legacy static entry kept for reference
`-- .env.example   # Root environment example
```

## Setup

1. Install dependencies:

```bash
npm install
npm --prefix server install
npm --prefix client install
```

2. Create environment files:

- Copy `.env.example` to `.env`
- Copy `server/.env.example` to `server/.env`
- Copy `client/.env.example` to `client/.env`

3. Start MongoDB locally and update `MONGODB_URI` if needed.

4. Seed the portfolio data:

```bash
npm run seed
```

5. Run the app:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and the API runs on `http://localhost:5000`.

## API endpoints

- `GET /api/health`
- `GET /api/portfolio`
- `POST /api/messages`

## Notes

- Existing static HTML files are still in the repo, but the new app lives in `client/` and `server/`.
- Portfolio content is currently seeded from `server/src/data/portfolioData.js`.
- Static images and the resume are served through the backend from `assets/`.
