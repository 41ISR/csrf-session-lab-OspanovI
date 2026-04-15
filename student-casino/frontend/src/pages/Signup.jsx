import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import Input from "../components/Input";
import Button from "../components/Button";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const { signup, error, clearError, user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    if (password !== confirmPassword) {
      setLocalError("Пароли не совпадают");
      return;
    }
    const result = await signup(username, email, password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="screen active">
      <div className="auth-container">
        <h1 className="casino-title">MELLGAME 🎲</h1>
        <div className="auth-tabs">
          <Link to="/login">
            <button className="tab-btn">Вход</button>
          </Link>
          <button className="tab-btn active">Регистрация</button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form active">
          {(error || localError) && (
            <div className="error-message">{error || localError}</div>
          )}
          <div className="form-group">
            <label>Имя пользователя</label>
            <Input
              type="text"
              placeholder="Придумайте имя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <Input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <Input
              type="password"
              placeholder="Придумайте пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Подтвердите пароль</label>
            <Input
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="btn-primary">
            Создать аккаунт
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
