import * as Y from "models/src/model/yahtzee.game";

export type IndexedYahtzee = Readonly<
  Omit<Y.Yahtzee, "roller"> & { id: number; PendingGames: false }
>;

export type IndexedYahtzeeSpecs = Readonly<
  Y.YahtzeeSpecs & { id: number; PendingGames: true }
>;
