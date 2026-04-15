import { Link } from 'react-router-dom';
import Button from './Button';

const Header = ({ username, balance }) => {
  return (
    <header className="game-header">
      <div className="user-info">
        <span className="username">{username}</span>
        <span className="balance">📊 {balance} баллов</span>
      </div>
      <nav className="game-nav">
        <Link to="/leaderboard">
          <Button className="nav-btn">🏆 Рейтинг</Button>
        </Link>
        <Link to="/logout">
          <Button className="nav-btn">Выход</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
