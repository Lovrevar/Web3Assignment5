import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./appStore";
import { IndexedYahtzeeSpecs } from "@/model/game";
import { deepClone } from "@/lib/utils";

interface PendingGamesGamesState {
  gameList: IndexedYahtzeeSpecs[];
}

const initialState: PendingGamesGamesState = {
  gameList: [],
};

const waitingGamesSlice = createSlice({
  name: "PendingGamesGames",
  initialState,
  reducers: {
    updatePendingGamesGame: (state, action: PayloadAction<IndexedYahtzeeSpecs>) => {
      const index = state.gameList.findIndex(
        (game) => game.id === action.payload.id
      );
      if (index > -1) {
        state.gameList[index] = deepClone(action.payload);
      }
    },

    upsertPendingGamesGame: (state, action: PayloadAction<IndexedYahtzeeSpecs>) => {
      const index = state.gameList.findIndex(
        (game) => game.id === action.payload.id
      );
      if (index > -1) {
        state.gameList[index] = deepClone(action.payload);
      } else {
        state.gameList.push(deepClone(action.payload));
      }
    },

    removePendingGamesGame: (state, action: PayloadAction<number>) => {
      state.gameList = state.gameList.filter(
        (game) => game.id !== action.payload
      );
    },
  },
});

export const {
  updatePendingGamesGame,
  upsertPendingGamesGame,
  removePendingGamesGame,
} = waitingGamesSlice.actions;
export default waitingGamesSlice.reducer;

export const selectGameById = (state: RootState, id: number) =>
  state.PendingGamesGames.gameList.find((game) => game.id === id);
