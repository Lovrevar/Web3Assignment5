import { Route, Routes } from "react-router-dom";
import Login from "./Views/Login";
import Game from "./Views/Game";
import GameLobby from "./Views/GameLobby";
import PendingGames from "./Views/PendingGames";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <div className="max-w-screen-2xl mx-auto bg-slate-800 h-screen">
      <div className="bg-white">
        <Routes>
          <Route
            path="/"
            element={
              <NavigationBar>
                <GameLobby />
              </NavigationBar>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/PendingGames/:id"
            element={
              <NavigationBar>
                <PendingGames />
              </NavigationBar>
            }
          />
          <Route
            path="/game/:id"
            element={
              <NavigationBar>
                <Game />
              </NavigationBar>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
