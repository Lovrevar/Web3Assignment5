import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  player: string | undefined;
}

const initialState: PlayerState = {
  player: undefined,
};

const userSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayer(state, action: PayloadAction<string | undefined>) {
      state.player = action.payload;
    },
  },
});

export const { setPlayer } = userSlice.actions;

export default userSlice.reducer;
