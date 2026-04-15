import { useState, useEffect } from "react";
import useStore from "../store/useStore";
import axios from "axios";
import Header from "../components/Header";
import SlotMachine from "../components/SlotMachine";
import PayoutTable from "../components/PayoutTable";
import Button from "../components/Button";

const Game = () => {
  const { balance, setBalance, csrfToken, user, fetchCsrfToken } = useStore();
  const [currentBet, setCurrentBet] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelResults, setReelResults] = useState(["📚", "✏️", "🧠"]);
  const [winMessage, setWinMessage] = useState("");

  const spin = async () => {
    if (isSpinning) return;
    if (balance < currentBet) {
      setWinMessage("Недостаточно баллов для ставки");
      return;
    }

    setIsSpinning(true);
    setWinMessage("");

    try {
      const response = await axios.post(
        "/api/spin",
        { bet: currentBet, csrfToken },
        { withCredentials: true },
      );
      const { symbols, winAmount, isWin, newBalance } = response.data;


      animateAndSetResult(symbols, winAmount, isWin);
      setBalance(newBalance);
    } catch (err) {
      console.error(err);
      setWinMessage("❌ Ошибка соединения с сервером");
      setIsSpinning(false);

      if (err.response?.status === 403) {
        await fetchCsrfToken();
      }
    }
  };

  const animateAndSetResult = (symbols, winAmount, isWin) => {
    setTimeout(() => {
      setReelResults(symbols);
      if (isWin) {
        setWinMessage(`🎉 ПОЗДРАВЛЯЕМ! Вы получили ${winAmount} баллов! 🎉`);
      } else {
        setWinMessage("😢 Не повезло... Попробуйте ещё раз!");
      }
      setIsSpinning(false);
    }, 1000);
  };

  const selectBet = (amount) => {
    if (!isSpinning) setCurrentBet(amount);
  };

  return (
    <div className="screen active">
      <div className="game-container">
        <Header username={user} balance={balance} />

        <div className="slot-machine">
          <div className="slot-machine-header">
            <h2>MELLGAME 🎲</h2>
          </div>

          <SlotMachine symbols={reelResults} isSpinning={isSpinning} />

          <div className="win-message">{winMessage}</div>

          <div className="bet-section">
            <h3>Выберите ставку</h3>
            <div className="bet-buttons">
              {[10, 50, 100].map((amount) => (
                <button
                  key={amount}
                  className={`bet-btn ${currentBet === amount ? "active" : ""}`}
                  onClick={() => selectBet(amount)}
                  disabled={isSpinning}
                >
                  <span className="bet-amount">{amount}</span>
                  <span className="bet-label">баллов</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            className="spin-btn"
            onClick={spin}
            disabled={isSpinning || balance < currentBet}
          >
            <span className="spin-text">КРУТИТЬ</span>
            <span className="spin-cost">Стоимость: {currentBet} баллов</span>
          </Button>
        </div>

        <PayoutTable />
      </div>
    </div>
  );
};

export default Game;
