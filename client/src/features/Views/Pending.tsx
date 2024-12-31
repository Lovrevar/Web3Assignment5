import { Button } from "@/components/ui/button";
import * as api from "../model/api";
import { useCallback, useEffect } from "react";
import { useNavigationBarigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/appStores/appStore";

const PendingGamesGames = () => {
  const NavigationBarigate = useNavigationBarigate();

  const { id } = useParams();
  const gameId = parseInt(id ?? "0", 10);

  const selectPendingGamesGames = (state: RootState) => state.PendingGamesGames.gameList;
  const selectOngoingGames = (state: RootState) => state.ongoingGames.gameList;
  const selectPlayer = (state: RootState) => state.player.player;

  const PendingGamesGames = useSelector(selectPendingGamesGames);
  const ongoingGames = useSelector(selectOngoingGames);
  const player = useSelector(selectPlayer);

  const selectedPendingGamesGame = PendingGamesGames.find((g) => g.id === gameId);
  const selectedOngoingGame = ongoingGames.find((g) => g.id === gameId);

  const canJoin = useCallback(() => {
    return (
      selectedPendingGamesGame &&
      player &&
      !selectedPendingGamesGame.players.includes(player)
    );
  }, [player, selectedPendingGamesGame]);

  const join = useCallback(() => {
    if (selectedPendingGamesGame && player && canJoin()) {
      api.join(selectedPendingGamesGame, player);
    }
  }, [selectedPendingGamesGame, player, canJoin]);

  useEffect(() => {
    if (!selectedPendingGamesGame) {
      if (selectedOngoingGame) {
        NavigationBarigate(`/game/${gameId}`);
      } else {
        NavigationBarigate("/");
      }
    }
  }, [selectedPendingGamesGame, selectedOngoingGame, gameId, NavigationBarigate]);

  useEffect(() => {
    if (!player) {
      NavigationBarigate(`/login?PendingGames=${id}`);
    } else if (!selectedPendingGamesGame) {
      if (selectedOngoingGame) {
        NavigationBarigate(`/game/${id}`, { replace: true });
      } else {
        NavigationBarigate("/", { replace: true });
      }
    }
  }, []);

  return (
    <div className="space-y-2">
      <h1>Game #{id}</h1>
      <p>
        Created by: <span>{selectedPendingGamesGame?.creator}</span>
      </p>
      <p>
        Players: <span>{selectedPendingGamesGame?.players.join(", ")}</span>
      </p>
      <p>
        Available Seats:{" "}
        <span>
          {(selectedPendingGamesGame?.number_of_players ?? 2) -
            (selectedPendingGamesGame?.players.length ?? 0)}
        </span>
      </p>
      {canJoin() && <Button onClick={join}>join</Button>}
    </div>
  );
};

export default PendingGames;
