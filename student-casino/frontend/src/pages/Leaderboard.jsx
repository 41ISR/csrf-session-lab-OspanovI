import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useStore from '../store/useStore';
import Button from '../components/Button';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const { user } = useStore();

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await axios.get('/api/leaderboard', { withCredentials: true });
        setLeaders(res.data);
      } catch (err) {
        console.error('Ошибка загрузки лидерборда', err);
      }
    };
    fetchLeaders();
  }, []);

  const getRankDisplay = (index) => {
    if (index === 0) return '🥇 1';
    if (index === 1) return '🥈 2';
    if (index === 2) return '🥉 3';
    return index + 1;
  };

  return (
    <div className="screen active">
      <div className="leaderboard-container">
        <Link to="/">
          <Button className="back-btn">← Назад к игре</Button>
        </Link>
        <h1>🏆 Рейтинг лучших 🏆</h1>
        <div className="leaderboard-table">
          <div className="leaderboard-header">
            <span>Место</span>
            <span>Студент</span>
            <span>Баллы</span>
          </div>
          {leaders.map((player, idx) => (
            <div
              key={idx}
              className={`leaderboard-row ${idx < 3 ? `rank-${idx + 1}` : ''} ${
                player.username === user ? 'highlight' : ''
              }`}
            >
              <span className="rank">{getRankDisplay(idx)}</span>
              <span className="player">
                {player.username} {player.username === user ? '(Вы)' : ''}
              </span>
              <span className="score">{player.balance.toLocaleString()}</span>
            </div>
          ))}
          {leaders.length === 0 && <div>Загрузка...</div>}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
