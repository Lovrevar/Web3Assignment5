import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./appStore";
import { IndexedYahtzee } from "@/model/game";
import { deepClone } from "@/lib/utils";

interface OngoingGamesState {
  gameList: IndexedYahtzee[];
}

const initialState: OngoingGamesState = {
  gameList: [],
};

const activeGamesSlice = createSlice({
  name: "ongoingGames",
  initialState,
  reducers: {
    upsertOnGoingGame: (state, action: PayloadAction<IndexedYahtzee>) => {
      if (state.gameList.some((g) => g.id === action.payload.id)) {
        const index = state.gameList.findIndex(
          (game) => game.id === action.payload.id
        );
        if (index > -1) {
          state.gameList[index] = deepClone(action.payload);
        }
      } else {
        state.gameList.push(deepClone(action.payload));
      }
    },
  },
});

export const { upsertOnGoingGame } = activeGamesSlice.actions;

export default activeGamesSlice.reducer;

export const selectOngoingGames = (state: RootState) =>
  state.ongoingGames.gameList;

export const selectOngoingGameById = (state: RootState, id: number) =>
  state.ongoingGames.gameList.find((game) => game.id === id);
