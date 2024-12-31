# WEB3 Assignment 5: Conversion to React + Redux

## Overview
This project is part of **WEB3 Assignment 5**, where we were tasked with converting an existing project from **Vue.js/Pinia** to a more modern technology stack using **React**, **Redux**, and optionally **RxJS**. The assignment provided a great opportunity to explore state management, functional models, and rendering strategies in React.

We decided to use the **Yahtzee project** as the base for our conversion and successfully implemented the requirements using Redux for state management and React for rendering.

## Assignment Objectives
The main objectives of the assignment were:

- **Convert the project to React + Redux**:
  Replace Vue.js with React and implement Redux for state management.
- **Preserve functional logic**:
  Retain the game logic while adapting it to the new architecture.
- **Enhance real-time messaging**:
  Use RxJS or similar tools to manage server-client communication.
- **Use modern rendering practices**:
  Use React’s component-based approach for better organization and scalability.

## What We Did
To meet the objectives, we implemented the following steps:

### 1. Migrated to React + Redux
- Replaced `.vue` components with `.tsx` components using React.
- Refactored the application structure to adhere to React best practices.
- Used Redux slices for managing state:
  - `playerSlice` for player data.
  - `ongoingGamesSlice` for tracking active games.
  - `pendingGamesSlice` for games awaiting players.

### 2. Preserved Functional Logic
- Retained the existing game logic (dice rolling, scoring, etc.) in files such as `game.ts` and `dice.ts`.
- Adapted the logic to fit the Redux state management model.

### 3. Implemented React Component Architecture
- Modularized the application with reusable components like:
  - `RollDiceComponent`: Handles the dice-rolling UI.
  - `GameScoreBoard`: Displays player scores.
  - `NavigationBar`: Manages user navigation.
- Organized views into dedicated files:
  - `Login.tsx`
  - `Lobby.tsx`
  - `Game.tsx`
  - `Pending.tsx`

### 4. Used Redux for State Management
- Managed application state using Redux Toolkit.
- Implemented state slices for clean and scalable code.
- Created a global store in `store.ts`.

### 5. Styling with Tailwind CSS
- Integrated Tailwind CSS for modern, responsive styling.
- Customized styles to align with the project’s design requirements.

### 6. Added RxJS (Optional)
- Used RxJS to manage server-client messaging for real-time updates.
- Simplified message handling logic by integrating RxJS operators into the game state management.

### Challenges
- **State Management Complexity**: Moving from Pinia to Redux required understanding how Redux actions, reducers, and middleware operate.
- **Component Refactoring**: Breaking down larger `.vue` components into smaller, reusable `.tsx` components.
- **Real-Time Messaging**: Implementing RxJS required additional setup and testing to ensure seamless communication.

### Learning Outcomes
- Gained practical experience in using **Redux Toolkit** for state management.
- Improved understanding of **RxJS** and its role in managing asynchronous messaging.
- Strengthened our knowledge of React’s component-based architecture.

## Features
- **Real-Time Gameplay**:
  - Players can roll dice and track scores in real time.
- **Dynamic Routing**:
  - Seamlessly navigate between login, lobby, and game views.
- **Modern Styling**:
  - Responsive design with Tailwind CSS.
- **Robust State Management**:
  - Centralized state using Redux for scalability.

## How to Run
To run the project locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/Lovrevar/Web3Assignment5
   ```

2. Navigate to the project folder:
   ```bash
   cd WEB3-5
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to explore the application.

## Acknowledgements
We would like to acknowledge the original Yahtzee project, which served as the foundation for this assignment. The core game logic and design inspired our implementation, which was adapted to meet the requirements of the React + Redux architecture.

## Disclaimer
This project builds upon an existing codebase, but all work related to the migration, restructuring, and implementation of React and Redux was completed by our team as part of this assignment. The focus was on demonstrating our ability to modernize the project and implement state management effectively.
