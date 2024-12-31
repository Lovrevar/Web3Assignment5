import RollDiceComponent from "@/components/RollDiceComponent";
import GameScoreBoard from "@/components/GameScoreBoard";
import { RootState } from "@/appappStores/appappStore";
import { is_finished, scores } from "../../../models/src/model/yahtzee.game";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigationBarigate, useParams } from "react-router-dom";

function Game() {
  const NavigationBarigate = useNavigationBarigate();

  const { id } = useParams();
  const gameId = parseInt(id ?? "0", 10);

  const selectGameById = (gameId: number) => (state: RootState) =>
    state.ongoingGames.gameList.find((g) => g.id === gameId);
  const selectPlayer = (state: RootState) => state.player.player;
  const player = useSelector(selectPlayer);

  const game = useSelector(selectGameById(gameId));

  const enabled = () =>
    game !== undefined && player === game.players[game.playerInTurn];
  const finished = () => game === undefined || is_finished(game);
  const standings = () => {
    if (game === undefined) return [];
    const standings: [string, number][] = scores(game).map((s, i) => [
      game.players[i],
      s,
    ]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    standings.sort(([x1, score1], [x2, score2]) => score2 - score1);
    return standings;
  };

  useEffect(() => {
    if (player === undefined) NavigationBarigate(`/login?game=${id}`);
    else if (game === undefined) NavigationBarigate("/");
  }, []);

  return (
    <>
      {game && player && (
        <div className="w-full h-full">
          <div>
            <h1 className="text-2xl bold ml-16 mt-4">Game #{id}</h1>
          </div>
          <div className="flex flex-row justify-center gap-24 h-full mt-4">
            <GameScoreBoard game={game} player={player} enabled={enabled()} />
            {!finished() ? (
              <>
                <div className=" w-80 h-80">
                  <div>
                    <RollDiceComponent game={game} player={player} enabled={enabled()} />
                  </div>
                </div>
              </>
            ) : (
              <div className="scoreboard">
                <table>
                  <thead>
                    <tr>
                      <td>Player</td>
                      <td>Score</td>
                    </tr>
                  </thead>
                  <tbody>
                    {standings().map((row) => {
                      return (
                        <tr
                          className={row[0] == player ? "current" : undefined}
                        >
                          <td>{row[0]}</td>
                          <td>{row[1]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Game;
