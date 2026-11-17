# CineSearch - React Movie & Show Explorer

A lightweight, frontend-only React + Vite application built using an MVVM-inspired structure (`useShowSearch` ViewModel hook + reusable `ShowCard` component) powered by the public TVMaze API and `localStorage` favorites persistence.

## Features
- **Live Debounced Search:** Fetches matching shows from `https://api.tvmaze.com/search/shows` with a 300ms debounce and automatic default catalog loading.
- **MVVM Separation:** Isolates API fetching, loading/error states, and `localStorage` persistence inside `src/viewmodels/useShowSearch.js`.
- **Persistent Favorites:** Save or remove shows across sessions using `localStorage` (`cine_favorites`) and switch between **Explore** and **Favorites** tabs.

## Prompts Used During Development
1. **Architecture & ViewModel Prompt:**
   > "Create a custom React hook `useShowSearch` following an MVVM pattern that fetches default shows from `https://api.tvmaze.com/shows?page=0` on load, queries `https://api.tvmaze.com/search/shows?q=` when the user types with a 300ms debounce, exposes `loading` and `error` states, and persists `favorites` in `localStorage`."
2. **UI Component Prompt:**
   > "Build a reusable `ShowCard` component displaying the show poster with a fallback placeholder, title, top two genres, average rating, and an accessible favorite toggle button using `aria-pressed`."
3. **Main View & Styling Prompt:**
   > "Wire `useShowSearch` and `ShowCard` into `App.jsx` with a responsive dark-themed CSS grid, a search bar, Explore/Favorites tabs, and accessible `role=status` and `role=alert` feedback states."

## How AI Assisted Throughout Implementation
- **Architecture Scaffolding:** Structured the separation between business logic (`src/viewmodels/useShowSearch.js`) and presentational components (`src/components/ShowCard.jsx`, `src/App.jsx`).
- **Boilerplate & Styling:** Generated the debounced `useEffect` fetch flow, responsive CSS grid layout, and initial state management rapidly.
- **Edge-Case Debugging:** Helped refine race-condition cancellation (`ignore` cleanup flag) and fallback handling for missing poster images and unrated shows.

## Manual Improvements & Refactoring After Code Review
- **Race-Condition Prevention:** Added an `ignore` boolean cleanup flag inside `useShowSearch` so fast typing does not allow older, slower API responses to overwrite newer search results.
- **Corrupted Storage Guard:** Wrapped `localStorage.getItem('cine_favorites')` in a `try/catch` block inside lazy `useState` initialization so malformed browser storage cannot crash the app on startup.
- **Accessibility & UX Polish:** Added `aria-pressed` on favorite buttons, `role="alert"` for network errors, and automatic switching back to the **Explore** tab when typing in the search bar while viewing **Favorites**.