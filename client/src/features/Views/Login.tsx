import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation, useNavigationBarigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlayer } from "../appStores/userSlice";

export default function Login() {
  const [player, _setPlayer] = useState<string>("");
  const NavigationBarigate = useNavigationBarigate();
  const location = useLocation();

  const enabled = player !== "";

  const dispatch = useDispatch();

  const login = () => {
    dispatch(setPlayer(player));

    const params = new URLSearchParams(location.search);

    if (params.get("game")) {
      NavigationBarigate(`/game/${params.get("game")}`);
    } else if (params.get("PendingGames")) {
      NavigationBarigate(`/PendingGames/${params.get("PendingGames")}`);
    } else {
      NavigationBarigate("/");
    }
  };

  const loginKeyListener = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && enabled) {
      e.preventDefault();
      login();
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col ">
        <p className="mt-2">Login</p>
        <p className="mt-2">
          Username:
          <Input
            className="h-8 flex w-36 mt-2"
            value={player}
            onChange={(e) => _setPlayer(e.target.value)}
            onKeyDown={loginKeyListener}
          />
          <Button
            className="mt-2 w-16 h-10 mb-2 ml-10"
            disabled={!enabled}
            onClick={login}
          >
            Login
          </Button>
        </p>
      </div>
    </>
  );
}
