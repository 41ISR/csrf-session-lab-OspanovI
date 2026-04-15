import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, clearError, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="screen active">
      <div className="auth-container">
        <h1 className="casino-title">MELLGAME 🎲</h1>
        <div className="auth-tabs">
          <button className="tab-btn active">Вход</button>
          <Link to="/signup">
            <button className="tab-btn">Регистрация</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="auth-form active">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Имя пользователя</label>
            <Input
              type="text"
              placeholder="Введите имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <Input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="btn-primary">
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
