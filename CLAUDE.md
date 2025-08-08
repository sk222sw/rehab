# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a rehabilitation exercise tracking application built with Preact and Vite, using PocketBase as the backend. The app allows users to create exercises and track daily completion of rehabilitation routines.

## Development Commands

- `npm run dev` - Start development server at http://localhost:5173/
- `npm run build` - Build for production to `dist/`
- `npm run preview` - Preview production build at http://localhost:4173/

## Docker Development

The application uses Docker Compose with two services:
- **pocketbase**: Database service exposing port 8090
- **frontend**: Preact application exposing port 80

Environment variables:
- `PB_ENCRYPTION_KEY`: PocketBase encryption key (defaults to "your-secret-key-here")
- `VITE_PB_URL`: PocketBase URL for the frontend to connect to

## Architecture

### Frontend Structure
- **src/index.jsx**: Main App component with exercise list and form
- **src/hooks/**: Custom Preact hooks for data fetching
  - `useExercises.js`: Manages exercise data
  - `useExerciseLog.js`: Manages daily exercise logs
- **src/lib/**: Service layer and utilities
  - `pocketbase.js`: PocketBase client configuration
  - `exerciseService.js`: Exercise CRUD operations
  - `exerciseLogService.js`: Daily log management
  - `dates.js`: Date formatting utilities

### Backend (PocketBase)
- **exercise** collection: Stores exercise definitions (id, name)
- **exercise_log** collection: Daily logs with date and exercises array (many-to-many relation)

### Key Patterns
- Uses custom hooks pattern for state management and API calls
- Service layer pattern with dedicated files for each collection
- PocketBase array field manipulation using `+`/`-` operators for adding/removing relations
- Date-based log retrieval with automatic creation when needed

### Data Flow
1. App loads exercises and today's log on mount
2. Users can add new exercises via form (creates in PocketBase)
3. Users toggle exercise completion (updates exercise_log with +/- operations)
4. Each date gets its own exercise_log record with array of completed exercise IDs

## File Structure Notes

- Migration files in `pocketbase/pb_migrations/` define the database schema
- Static assets in `public/` and `src/assets/`
- Dockerfiles in `ops/` directory
- PocketBase data stored in `pocketbase/pb_data/`