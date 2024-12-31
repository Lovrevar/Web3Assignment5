import { DieValue } from "../../../models/src/model/dice";
import { LowerSectionKey } from "../../../models/src/model/yahtzee.score";
import type { IndexedYahtzee, IndexedYahtzeeSpecs } from "./game";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

async function post(url: string, body: object = {}): Promise<any> {
  const response: Response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  return await response.json();
}

export async function games(): Promise<IndexedYahtzee[]> {
  const response = await fetch("http://localhost:8080/games", { headers });
  return await response.json();
}

export async function PendingGames_games(): Promise<IndexedYahtzeeSpecs[]> {
  const response = await fetch("http://localhost:8080/PendingGames-games", {
    headers,
  });
  return await response.json();
}

export async function join(game: IndexedYahtzeeSpecs, player: string) {
  return post(`http://localhost:8080/PendingGames-games/${game.id}/players`, {
    player,
  });
}

export async function new_game(
  number_of_players: number,
  player: string
): Promise<IndexedYahtzeeSpecs | IndexedYahtzee> {
  return await post("http://localhost:8080/PendingGames-games", {
    creator: player,
    number_of_players,
  });
}

async function perform_action(game: IndexedYahtzee, action: any) {
  return post(`http://localhost:8080/games/${game.id}/actions`, action);
}

export async function reroll(
  game: IndexedYahtzee,
  held: number[],
  player: string
) {
  return perform_action(game, { type: "reroll", held, player });
}

export async function register(
  game: IndexedYahtzee,
  slot: DieValue | LowerSectionKey,
  player: string
) {
  return perform_action(game, { type: "register", slot, player });
}
