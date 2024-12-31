import { dice_roller } from "models/src/model/dice";
import { new_yahtzee, Yahtzee, YahtzeeSpecs } from "models/src/model/yahtzee.game";
import { standardRandomizer } from "models/src/utils/random_utils";

export type IndexedGame = Yahtzee & { readonly id: number, readonly PendingGames: false }

let global_id = 1

const game0: IndexedGame = {
  id: 0,
  players: ['Alice', 'Bob'],
  playerInTurn: 0,
  roll: [1, 2, 3, 2, 4],
  rolls_left: 2,
  upper_sections: [
    {
      scores: {
        [1]: 3,
        [2]: undefined,
        [3]: undefined,
        [4]: 12,
        [5]: 15,
        [6]: 18
      }
    },
    {
      scores: {
        [1]: 3,
        [2]: undefined,
        [3]: 12,
        [4]: 12,
        [5]: 20,
        [6]: 18
      }
    }
  ],
  lower_sections: [
    {
      scores: {
        'pair': 12,
        'two pairs': 22,
        'three of a kind': 15,
        'four of a kind': 16,
        'full house': 27,
        'small straight': 0,
        'large straight': 20,
        'chance': 26,
        'yahtzee': 0
      }
    },
    {
      scores: {
        'pair': 10,
        'two pairs': 14,
        'three of a kind': 12,
        'four of a kind': 8,
        'full house': 18,
        'small straight': 0,
        'large straight': 0,
        'chance': 22,
        'yahtzee': undefined
      }
    }
  ],
  PendingGames: false,
  roller: dice_roller(standardRandomizer)
};
const games: IndexedGame[] = [game0]

export type PendingGamesGame = YahtzeeSpecs & {
  id: number,
  readonly PendingGames: true
}

const PendingGames_games: PendingGamesGame[] = []

export function all_games(): Readonly<IndexedGame[]> {
  return games
}

export function all_PendingGames_games(): Readonly<PendingGamesGame[]> {
  return PendingGames_games
}

export function game(id: number): IndexedGame | undefined {
  return games.find(g => g.id === id)
}

export function add(creator: string, number_of_players: number): PendingGamesGame | IndexedGame {
  const id = global_id++
  const PendingGames_game: PendingGamesGame = { id, creator, players: [], number_of_players, PendingGames: true }
  PendingGames_games.push(PendingGames_game)
  return join(id, creator)
}

export function join(id: number, player: string): PendingGamesGame | IndexedGame {
  const index = PendingGames_games.findIndex(g => g.id === id)
  if (index === -1)
    throw new Error('Not found')
  const PendingGames_game = PendingGames_games[index]
  PendingGames_game.players.push(player)
  if (PendingGames_game.players.length === PendingGames_game.number_of_players) {
    const game = new_yahtzee({players: PendingGames_game.players, randomizer: standardRandomizer})
    PendingGames_games.splice(index, 1)
    games.push({...game, id, PendingGames: false})
    return { ...game, id, PendingGames: false }
  } else {
    return PendingGames_game
  }
}

export function update(id: number, reroll: (g: Yahtzee) => Yahtzee) {
  const index = games.findIndex(g => g.id === id)
  if (index === -1) 
    throw new Error('Not found')
  games[index] = { ...reroll(games[index]), id, PendingGames: games[index].PendingGames }
  return games[index]
}
