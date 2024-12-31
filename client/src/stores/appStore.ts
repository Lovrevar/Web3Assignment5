import { configureappStore } from "@reduxjs/toolkit";
import playerReducer from "./userSlice";
import PendingGamesGamesReducer from "./waitingGamesSlice";
import ongoingGamesReducer from "./activeGamesSlice";

export const appStore = configureappStore({
  reducer: {
    player: playerReducer,
    PendingGamesGames: PendingGamesGamesReducer,
    ongoingGames: ongoingGamesReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
