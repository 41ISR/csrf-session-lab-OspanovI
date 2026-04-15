import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useStore from "./store/useStore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import Leaderboard from "./pages/Leaderboard";
import Logout from "./pages/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const { checkAuth, isLoading } = useStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="loading-screen">Загрузка...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
