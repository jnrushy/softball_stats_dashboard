# Softball Stats Dashboard

A modern, comprehensive dashboard for managing girls softball team statistics, schedules, and player information.

## Features

- **Team Statistics Dashboard** - Real-time team performance metrics
- **Player Profiles** - Individual player statistics and information
- **Game Schedule** - Season schedule with results and upcoming games
- **Performance Analytics** - Advanced statistics and trends
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, professional interface with intuitive navigation

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **Backend**: Node.js with Express
- **Icons**: Lucide React for beautiful icons

## Quick Start

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Project Structure

```
softball-stats-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript type definitions
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   └── data/            # Mock data and database logic
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run server` - Start backend server only
- `npm run client` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm start` - Start production server

## Contributing

This project follows engineering best practices:
- Clear, readable code over cleverness
- DRY principles
- Proper separation of concerns
- Comprehensive testing
- Environment-aware configuration 